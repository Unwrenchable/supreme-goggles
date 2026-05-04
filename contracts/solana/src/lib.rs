use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

// Deployed program ID on Solana devnet
// Deployment signature: S11ti127cpRWfEevYtJCx2FsNrNVE5vYKBF1UqqG67gWyNokDLyg46VAvCfPeuEPusgsC
declare_id!("6vyzvhsAbQxttvgvaouHuYrqhSAV8TLMoimkEQWwCyyR");

#[program]
pub mod domain_registry {
    use super::*;

    /**
     * Initialize the registry with treasury address
     */
    pub fn initialize(ctx: Context<Initialize>, treasury: Pubkey, registration_fee: u64) -> Result<()> {
        let registry = &mut ctx.accounts.registry;
        registry.authority = ctx.accounts.authority.key();
        registry.treasury = treasury;
        registry.registration_fee = registration_fee;
        registry.paused = false;
        registry.total_domains = 0;
        
        msg!("Domain Registry initialized!");
        msg!("Authority: {}", registry.authority);
        msg!("Treasury: {}", registry.treasury);
        msg!("Fee: {} lamports", registration_fee);
        
        Ok(())
    }

    /**
     * Register a new domain with lifetime ownership
     * Payment goes directly to the configured treasury address
     */
    pub fn register_domain(
        ctx: Context<RegisterDomain>,
        domain_name: String,
        extension: String,
    ) -> Result<()> {
        let registry = &ctx.accounts.registry;
        let domain = &mut ctx.accounts.domain;
        let clock = Clock::get()?;

        require!(!registry.paused, ErrorCode::ContractPaused);
        require!(domain_name.len() > 0 && domain_name.len() <= 63, ErrorCode::InvalidDomainName);
        require!(extension.len() > 0 && extension.len() <= 20, ErrorCode::InvalidExtension);

        // Transfer payment to treasury
        if registry.registration_fee > 0 {
            let transfer_instruction = system_instruction::transfer(
                &ctx.accounts.payer.key(),
                &registry.treasury,
                registry.registration_fee,
            );
            
            anchor_lang::solana_program::program::invoke(
                &transfer_instruction,
                &[
                    ctx.accounts.payer.to_account_info(),
                    ctx.accounts.treasury.to_account_info(),
                    ctx.accounts.system_program.to_account_info(),
                ],
            )?;
        }

        // Initialize domain account
        domain.owner = ctx.accounts.payer.key();
        domain.domain_name = domain_name.clone();
        domain.extension = extension.clone();
        domain.registration_date = clock.unix_timestamp;
        domain.expiration_date = i64::MAX; // Lifetime ownership
        domain.is_active = true;
        domain.wallet_address = String::new();
        domain.ipfs_hash = String::new();
        domain.twitter = String::new();
        domain.discord = String::new();
        domain.email = String::new();
        domain.website = String::new();
        domain.avatar = String::new();

        // Update registry stats
        let registry = &mut ctx.accounts.registry;
        registry.total_domains += 1;

        emit!(DomainRegisteredEvent {
            domain_name,
            extension,
            owner: ctx.accounts.payer.key(),
            payment_amount: registry.registration_fee,
            timestamp: clock.unix_timestamp,
        });

        Ok(())
    }

    /**
     * Update domain records (wallet, IPFS, social)
     */
    pub fn update_records(
        ctx: Context<UpdateRecords>,
        wallet_address: Option<String>,
        ipfs_hash: Option<String>,
        twitter: Option<String>,
        discord: Option<String>,
        email: Option<String>,
        website: Option<String>,
        avatar: Option<String>,
    ) -> Result<()> {
        let domain = &mut ctx.accounts.domain;
        let clock = Clock::get()?;

        if let Some(addr) = wallet_address {
            domain.wallet_address = addr;
        }
        if let Some(hash) = ipfs_hash {
            domain.ipfs_hash = hash;
        }
        if let Some(tw) = twitter {
            domain.twitter = tw;
        }
        if let Some(dc) = discord {
            domain.discord = dc;
        }
        if let Some(em) = email {
            domain.email = em;
        }
        if let Some(web) = website {
            domain.website = web;
        }
        if let Some(av) = avatar {
            domain.avatar = av;
        }

        emit!(RecordUpdatedEvent {
            domain_name: domain.domain_name.clone(),
            owner: domain.owner,
            timestamp: clock.unix_timestamp,
        });

        Ok(())
    }

    /**
     * Transfer domain ownership
     */
    pub fn transfer_domain(
        ctx: Context<TransferDomain>,
        new_owner: Pubkey,
    ) -> Result<()> {
        let domain = &mut ctx.accounts.domain;
        let old_owner = domain.owner;
        let clock = Clock::get()?;

        domain.owner = new_owner;

        emit!(DomainTransferredEvent {
            domain_name: domain.domain_name.clone(),
            from: old_owner,
            to: new_owner,
            timestamp: clock.unix_timestamp,
        });

        Ok(())
    }

    /**
     * Update treasury address (admin only)
     */
    pub fn update_treasury(ctx: Context<UpdateRegistry>, new_treasury: Pubkey) -> Result<()> {
        let registry = &mut ctx.accounts.registry;
        let old_treasury = registry.treasury;
        registry.treasury = new_treasury;

        emit!(TreasuryUpdatedEvent {
            old_treasury,
            new_treasury,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    /**
     * Update registration fee (admin only)
     */
    pub fn update_fee(ctx: Context<UpdateRegistry>, new_fee: u64) -> Result<()> {
        let registry = &mut ctx.accounts.registry;
        let old_fee = registry.registration_fee;
        registry.registration_fee = new_fee;

        emit!(FeeUpdatedEvent {
            old_fee,
            new_fee,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    /**
     * Pause/unpause the registry (admin only)
     */
    pub fn set_paused(ctx: Context<UpdateRegistry>, paused: bool) -> Result<()> {
        let registry = &mut ctx.accounts.registry;
        registry.paused = paused;

        emit!(PausedEvent {
            paused,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
}

// ============ Accounts ============

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Registry::LEN,
        seeds = [b"registry"],
        bump
    )]
    pub registry: Account<'info, Registry>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(domain_name: String)]
pub struct RegisterDomain<'info> {
    #[account(mut)]
    pub registry: Account<'info, Registry>,
    
    #[account(
        init,
        payer = payer,
        space = 8 + Domain::LEN,
        seeds = [b"domain", domain_name.as_bytes()],
        bump
    )]
    pub domain: Account<'info, Domain>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    /// CHECK: Treasury account to receive payment
    #[account(mut)]
    pub treasury: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateRecords<'info> {
    #[account(
        mut,
        has_one = owner,
        constraint = domain.is_active @ ErrorCode::DomainNotActive
    )]
    pub domain: Account<'info, Domain>,
    
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct TransferDomain<'info> {
    #[account(
        mut,
        has_one = owner,
        constraint = domain.is_active @ ErrorCode::DomainNotActive
    )]
    pub domain: Account<'info, Domain>,
    
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateRegistry<'info> {
    #[account(
        mut,
        has_one = authority
    )]
    pub registry: Account<'info, Registry>,
    
    pub authority: Signer<'info>,
}

// ============ State ============

#[account]
pub struct Registry {
    pub authority: Pubkey,      // 32
    pub treasury: Pubkey,        // 32
    pub registration_fee: u64,   // 8
    pub paused: bool,            // 1
    pub total_domains: u64,      // 8
}

impl Registry {
    pub const LEN: usize = 32 + 32 + 8 + 1 + 8;
}

#[account]
pub struct Domain {
    pub owner: Pubkey,              // 32
    pub domain_name: String,        // 4 + 63
    pub extension: String,          // 4 + 20
    pub registration_date: i64,     // 8
    pub expiration_date: i64,       // 8
    pub is_active: bool,            // 1
    pub wallet_address: String,     // 4 + 100
    pub ipfs_hash: String,          // 4 + 100
    pub twitter: String,            // 4 + 50
    pub discord: String,            // 4 + 50
    pub email: String,              // 4 + 100
    pub website: String,            // 4 + 200
    pub avatar: String,             // 4 + 100
}

impl Domain {
    pub const LEN: usize = 32 + 67 + 24 + 8 + 8 + 1 + 104 + 104 + 54 + 54 + 104 + 204 + 104;
}

// ============ Events ============

#[event]
pub struct DomainRegisteredEvent {
    pub domain_name: String,
    pub extension: String,
    pub owner: Pubkey,
    pub payment_amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct RecordUpdatedEvent {
    pub domain_name: String,
    pub owner: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct DomainTransferredEvent {
    pub domain_name: String,
    pub from: Pubkey,
    pub to: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct TreasuryUpdatedEvent {
    pub old_treasury: Pubkey,
    pub new_treasury: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FeeUpdatedEvent {
    pub old_fee: u64,
    pub new_fee: u64,
    pub timestamp: i64,
}

#[event]
pub struct PausedEvent {
    pub paused: bool,
    pub timestamp: i64,
}

// ============ Errors ============

#[error_code]
pub enum ErrorCode {
    #[msg("Contract is paused")]
    ContractPaused,
    
    #[msg("Invalid domain name")]
    InvalidDomainName,
    
    #[msg("Invalid extension")]
    InvalidExtension,
    
    #[msg("Domain is not active")]
    DomainNotActive,
    
    #[msg("Insufficient payment")]
    InsufficientPayment,
}
