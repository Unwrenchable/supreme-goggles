const solc = require('solc');
const fs = require('fs');
const path = require('path');

console.log('🔨 Compiling DomainRegistry.sol...\n');

// Read the contract source
const contractPath = path.join(__dirname, '../contracts/solidity/DomainRegistry.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// Prepare compiler input
const input = {
  language: 'Solidity',
  sources: {
    'DomainRegistry.sol': {
      content: source,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode'],
      },
    },
  },
};

// Compile
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check for errors
if (output.errors) {
  const errors = output.errors.filter(e => e.severity === 'error');
  if (errors.length > 0) {
    console.error('❌ Compilation errors:');
    errors.forEach(error => console.error(error.formattedMessage));
    process.exit(1);
  }
  
  // Show warnings
  const warnings = output.errors.filter(e => e.severity === 'warning');
  if (warnings.length > 0) {
    console.warn('⚠️  Warnings:');
    warnings.forEach(warning => console.warn(warning.formattedMessage));
  }
}

// Extract compiled contract
const contract = output.contracts['DomainRegistry.sol']['DomainRegistry'];
const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

// Save ABI
const abiPath = path.join(__dirname, '../contracts/DomainRegistry.json');
const abiData = {
  abi: abi,
  bytecode: bytecode,
  address: "0x0000000000000000000000000000000000000000" // Placeholder
};

fs.writeFileSync(abiPath, JSON.stringify(abiData, null, 2));

console.log('✅ Compilation successful!');
console.log('📄 ABI saved to:', abiPath);
console.log('📊 Contract size:', bytecode.length / 2, 'bytes');
console.log('');

// Print summary
console.log('📋 Contract functions:');
abi.filter(item => item.type === 'function').forEach(fn => {
  const params = fn.inputs.map(i => i.type).join(', ');
  console.log(`   - ${fn.name}(${params})`);
});

console.log('\n🎉 Ready to deploy!');
