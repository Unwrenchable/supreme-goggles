#!/usr/bin/env node

/**
 * Deployment Readiness Check
 * 
 * This script verifies that the application is ready for deployment.
 * It checks build success, configuration, and provides a deployment report.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Deployment Readiness...\n');

const checks = {
  passed: [],
  failed: [],
  warnings: [],
};

function addResult(type, message) {
  checks[type].push(message);
}

// Check 1: package.json exists and has correct scripts
console.log('📦 Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.scripts.build === 'next build') {
    addResult('passed', 'Build script configured correctly');
  } else {
    addResult('warnings', 'Build script uses custom command');
  }
  if (packageJson.dependencies['next']) {
    addResult('passed', 'Next.js dependency present');
  }
} catch (e) {
  addResult('failed', 'package.json not found or invalid');
}

// Check 2: next.config.ts exists
console.log('⚙️  Checking Next.js configuration...');
if (fs.existsSync('next.config.ts')) {
  addResult('passed', 'next.config.ts exists');
} else {
  addResult('failed', 'next.config.ts not found');
}

// Check 3: vercel.json exists
console.log('🚀 Checking Vercel configuration...');
if (fs.existsSync('vercel.json')) {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  if (vercelConfig.installCommand && vercelConfig.installCommand.includes('--legacy-peer-deps')) {
    addResult('passed', 'Vercel configured with --legacy-peer-deps');
  } else {
    addResult('warnings', 'Vercel config may need --legacy-peer-deps');
  }
  addResult('passed', 'vercel.json exists');
} else {
  addResult('warnings', 'vercel.json not found (optional but recommended)');
}

// Check 4: .env.example exists
console.log('🔐 Checking environment configuration...');
if (fs.existsSync('.env.example')) {
  addResult('passed', '.env.example exists for reference');
} else {
  addResult('warnings', '.env.example not found');
}

// Check 5: node_modules exists
console.log('📚 Checking dependencies...');
if (fs.existsSync('node_modules')) {
  addResult('passed', 'Dependencies are installed');
} else {
  addResult('failed', 'Dependencies not installed - run: npm install --legacy-peer-deps');
}

// Check 6: Try to build
console.log('\n🔨 Testing build process...');
console.log('This may take a minute...\n');

exec('npm run build', { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
  const hasIndexDBError = stderr.includes('indexedDB is not defined') || stdout.includes('indexedDB is not defined');
  const buildSucceeded = !error || error.code === 0;

  console.log('\n📊 Build Results:');
  
  if (buildSucceeded) {
    addResult('passed', 'Build completed successfully');
    if (hasIndexDBError) {
      addResult('warnings', 'indexedDB error during build (expected, harmless)');
    }
  } else {
    addResult('failed', 'Build failed - check output above');
  }

  // Print final report
  console.log('\n' + '='.repeat(60));
  console.log('DEPLOYMENT READINESS REPORT');
  console.log('='.repeat(60));

  if (checks.passed.length > 0) {
    console.log('\n✅ PASSED:');
    checks.passed.forEach(msg => console.log(`   ✓ ${msg}`));
  }

  if (checks.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    checks.warnings.forEach(msg => console.log(`   ⚠ ${msg}`));
  }

  if (checks.failed.length > 0) {
    console.log('\n❌ FAILED:');
    checks.failed.forEach(msg => console.log(`   ✗ ${msg}`));
  }

  console.log('\n' + '='.repeat(60));

  // Overall status
  if (checks.failed.length === 0 && buildSucceeded) {
    console.log('\n🎉 READY FOR DEPLOYMENT!');
    console.log('\nNext steps:');
    console.log('1. Push code to GitHub');
    console.log('2. Import project to Vercel');
    console.log('3. Add environment variables (see .env.example)');
    console.log('4. Deploy!');
    console.log('\n📖 See DEPLOYMENT_TROUBLESHOOTING.md for detailed guide\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  NEEDS ATTENTION');
    console.log('\nFix the failed checks above before deploying.');
    console.log('See DEPLOYMENT_TROUBLESHOOTING.md for help.\n');
    process.exit(1);
  }
});
