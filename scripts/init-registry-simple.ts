import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import * as fs from 'fs';
import * as borsh from 'borsh';

// Initialize the Solana domain registry on devnet
async function initializeRegistry() {
  // Connect to devnet
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  
  // Load the wallet keypair
  const keypairData = JSON.parse(fs.readFileSync(process.env.HOME + '/.config/solana/id.json', 'utf8'));
  const payer = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  
  console.log("🔑 Payer:", payer.publicKey.toString());
  
  // Program ID
  const programId = new PublicKey("6vyzvhsAbQxttvgvaouHuYrqhSAV8TLMoimkEQWwCyyR");
  
  // Treasury address (same as payer)
  const treasury = payer.publicKey;
  
  // Registration fee: 0 lamports
  const registrationFee = BigInt(0);
  
  // Find registry PDA
  const [registryPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("registry")],
    programId
  );
  
  console.log("📋 Registry PDA:", registryPDA.toString());
  console.log("💰 Treasury:", treasury.toString());
  console.log("💵 Registration Fee:", registrationFee.toString(), "lamports\n");
  
  // Encode instruction data for initialize instruction
  // Instruction discriminator (first 8 bytes) is SHA256("global:initialize")[0..8]
  const discriminator = Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]); // "initialize" discriminator
  
  // Serialize treasury pubkey (32 bytes) and fee (8 bytes as little-endian u64)
  const treasuryBytes = treasury.toBytes();
  const feeBytes = Buffer.alloc(8);
  feeBytes.writeBigUInt64LE(registrationFee);
  
  const instructionData = Buffer.concat([discriminator, treasuryBytes, feeBytes]);
  
  // Create the initialize instruction
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: registryPDA, isSigner: false, isWritable: true },
      { pubkey: payer.publicKey, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId,
    data: instructionData,
  });
  
  // Create and send transaction
  const transaction = new Transaction().add(instruction);
  
  console.log("📤 Sending transaction...");
  
  try {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payer],
      { commitment: "confirmed" }
    );
    
    console.log("\n✅ Registry initialized successfully!");
    console.log("📝 Transaction signature:", signature);
    console.log("\n🔗 Explorer:");
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    console.log(`\n🎉 Your registry is ready! Users can now register domains.`);
    
  } catch (error: any) {
    console.error("\n❌ Error initializing registry:");
    console.error(error.message);
    if (error.logs) {
      console.error("\nProgram logs:");
      error.logs.forEach((log: string) => console.error(log));
    }
    throw error;
  }
}

initializeRegistry()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
