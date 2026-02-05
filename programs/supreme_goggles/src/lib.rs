use anchor_lang::prelude::*;

declare_id!("6TYgZUksdPpdrZAHs1FeDN9QKcJGCwovEwHSY4ncCuSy");

#[program]
pub mod supreme_goggles {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
