import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

// Initialize the Solana domain registry on devnet
async function initializeRegistry() {
  // Configure the client to use devnet
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Program ID from deployment
  const programId = new PublicKey("6vyzvhsAbQxttvgvaouHuYrqhSAV8TLMoimkEQWwCyyR");
  
  // Load the IDL
  const idl = await anchor.Program.fetchIdl(programId, provider);
  if (!idl) {
    throw new Error("IDL not found");
  }
  
  const program = new Program(idl, provider);

  // Treasury address (same as deployer wallet)
  const treasury = provider.wallet.publicKey;
  
  // Registration fee: 0 lamports (free registration for testing)
  const registrationFee = new anchor.BN(0);

  console.log("Initializing registry...");
  console.log("Program ID:", programId.toString());
  console.log("Authority:", provider.wallet.publicKey.toString());
  console.log("Treasury:", treasury.toString());
  console.log("Registration Fee:", registrationFee.toString(), "lamports");

  try {
    // Find the registry PDA
    const [registryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("registry")],
      programId
    );

    console.log("Registry PDA:", registryPda.toString());

    // Initialize the registry
    const tx = await program.methods
      .initialize(treasury, registrationFee)
      .accounts({
        registry: registryPda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("\n✅ Registry initialized successfully!");
    console.log("Transaction signature:", tx);
    console.log("\nRegistry Details:");
    console.log("- Authority:", provider.wallet.publicKey.toString());
    console.log("- Treasury:", treasury.toString());
    console.log("- Fee:", registrationFee.toString(), "lamports (FREE)");
    console.log("\nExplorer:", `https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    
  } catch (error) {
    console.error("Error initializing registry:", error);
    throw error;
  }
}

initializeRegistry()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
