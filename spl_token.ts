import {
  getOrCreateAssociatedTokenAccount,
  createMint,
  mintTo,
  transfer,
} from "@solana/spl-token";
import * as web3 from "@solana/web3.js";

import wallet_keypair from "/Users/magnum/.config/solana/id.json";

const run = async () => {
  const wallet = web3.Keypair.fromSecretKey(Buffer.from(wallet_keypair));

  const connection = new web3.Connection(
    "https://api.devnet.solana.com",
    "confirmed" // commitment
  );

  const mintAccount = await createMint(
    connection,
    recipient,
    wallet.publicKey,
    wallet.publicKey,
    9
  );
  console.log("mintAccount", mintAccount)

  // associated token account generated using spl-token library, mint-account, recipient
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mintAccount,
    wallet.publicKey
  );
  console.log("Associated token account", tokenAccount.address);

  // generating 1000 tokens
  const signature = await mintTo(
    connection,
    wallet,
    mintAccount,
    tokenAccount.address,
    wallet,
    1000000000
  )
  console.log("mint transaction hash", signature);
  

}


run();