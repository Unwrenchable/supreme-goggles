import { ethers } from "hardhat";

/**
 * Deploy DomainRegistry contract
 * 
 * Usage:
 *   npx hardhat run scripts/deploy.ts --network polygon
 *   npx hardhat run scripts/deploy.ts --network bsc
 *   npx hardhat run scripts/deploy.ts --network sepolia (testnet)
 */

async function main() {
  console.log("🚀 Deploying DomainRegistry contract...\n");

  // Get deployment parameters from environment or use defaults
  const treasuryAddress = process.env.TREASURY_ADDRESS;
  const registrationFee = process.env.REGISTRATION_FEE || "0"; // 0 = free, or specify in wei
  
  if (!treasuryAddress) {
    console.error("❌ Error: TREASURY_ADDRESS not set in environment variables");
    console.log("Please set TREASURY_ADDRESS in your .env file");
    console.log("Example: TREASURY_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
    process.exit(1);
  }

  console.log("📋 Deployment Configuration:");
  console.log("   Treasury Address:", treasuryAddress);
  console.log("   Registration Fee:", registrationFee, "wei");
  console.log("");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deploying from account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

  // Deploy the contract
  console.log("⏳ Deploying contract...");
  const DomainRegistry = await ethers.getContractFactory("DomainRegistry");
  const domainRegistry = await DomainRegistry.deploy(treasuryAddress, registrationFee);

  await domainRegistry.waitForDeployment();
  const contractAddress = await domainRegistry.getAddress();

  console.log("✅ DomainRegistry deployed to:", contractAddress);
  console.log("");

  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network Information:");
  console.log("   Network Name:", network.name);
  console.log("   Chain ID:", network.chainId.toString());
  console.log("");

  // Verify contract configuration
  console.log("🔍 Verifying contract configuration...");
  const owner = await domainRegistry.owner();
  const treasury = await domainRegistry.treasury();
  const fee = await domainRegistry.registrationFee();
  const paused = await domainRegistry.paused();
  const version = await domainRegistry.version();

  console.log("   Owner:", owner);
  console.log("   Treasury:", treasury);
  console.log("   Registration Fee:", fee.toString(), "wei");
  console.log("   Paused:", paused);
  console.log("   Version:", version);
  console.log("");

  // Generate environment variable configuration
  console.log("📝 Add this to your .env.local file:");
  console.log("=".repeat(80));
  
  const networkName = network.name.toUpperCase().replace("-", "_");
  console.log(`NEXT_PUBLIC_${networkName}_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("=".repeat(80));
  console.log("");

  // Verification instructions
  console.log("🔐 To verify on block explorer, run:");
  console.log(`npx hardhat verify --network ${network.name} ${contractAddress} ${treasuryAddress} ${registrationFee}`);
  console.log("");

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    contractAddress: contractAddress,
    treasury: treasuryAddress,
    registrationFee: registrationFee,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  const fs = require("fs");
  const deploymentsDir = "./deployments";
  
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const filename = `${deploymentsDir}/${network.name}-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));
  
  console.log("💾 Deployment info saved to:", filename);
  console.log("");
  console.log("🎉 Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
