#!/usr/bin/env node

/**
 * Deployment Health Check Script
 * 
 * This script checks the health of the deployed application.
 * Usage: node scripts/check-deployment.js [URL]
 * 
 * Example:
 *   node scripts/check-deployment.js https://mywe3platform.vercel.app
 */

const https = require('https');
const http = require('http');

const url = process.argv[2] || 'https://mywe3platform.vercel.app';

console.log('🔍 Checking deployment health...');
console.log(`📍 URL: ${url}\n`);

const checks = [
  { path: '/api/health', name: 'Health Check API' },
  { path: '/', name: 'Homepage' },
  { path: '/api/domains/check?domain=test&extension=.fizz', name: 'Domain Check API' },
];

async function checkEndpoint(baseUrl, path, name) {
  return new Promise((resolve) => {
    const fullUrl = new URL(path, baseUrl);
    const client = fullUrl.protocol === 'https:' ? https : http;
    
    const startTime = Date.now();
    
    const req = client.get(fullUrl, (res) => {
      const duration = Date.now() - startTime;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const status = res.statusCode;
        const success = status >= 200 && status < 300;
        
        console.log(`${success ? '✅' : '❌'} ${name}`);
        console.log(`   Status: ${status}`);
        console.log(`   Duration: ${duration}ms`);
        
        if (success) {
          try {
            const json = JSON.parse(data);
            console.log(`   Response:`, JSON.stringify(json, null, 2).split('\n').slice(0, 5).join('\n   '));
          } catch (e) {
            console.log(`   Response: ${data.substring(0, 100)}${data.length > 100 ? '...' : ''}`);
          }
        } else {
          console.log(`   Error: ${data.substring(0, 200)}`);
        }
        console.log('');
        
        resolve({ name, success, status, duration, data });
      });
    });
    
    req.on('error', (error) => {
      const duration = Date.now() - startTime;
      console.log(`❌ ${name}`);
      console.log(`   Error: ${error.message}`);
      console.log(`   Duration: ${duration}ms\n`);
      
      resolve({ name, success: false, error: error.message, duration });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`❌ ${name}`);
      console.log(`   Error: Request timeout (10s)\n`);
      resolve({ name, success: false, error: 'Timeout', duration: 10000 });
    });
  });
}

async function runChecks() {
  const results = [];
  
  for (const check of checks) {
    const result = await checkEndpoint(url, check.path, check.name);
    results.push(result);
  }
  
  console.log('\n📊 Summary');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`✅ Successful: ${successful}/${total}`);
  console.log(`❌ Failed: ${total - successful}/${total}`);
  
  const avgDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0) / results.length;
  console.log(`⏱️  Average Response Time: ${avgDuration.toFixed(0)}ms`);
  
  if (successful === total) {
    console.log('\n🎉 All checks passed! Deployment is healthy.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Review the logs above.');
    process.exit(1);
  }
}

runChecks().catch((error) => {
  console.error('❌ Script error:', error);
  process.exit(1);
});
