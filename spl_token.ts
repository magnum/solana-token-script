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
    wallet,
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
    10000000000
  )
  console.log("mint transaction hash", signature);
  

  const recipient = await web3.Keypair.generate();
  // need to created a reciptient token account too
  const tokenAccountRecipient = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet, // payer is the previous wallet, otherwise recipient needs sol to pay for the aridrop
    mintAccount,
    recipient.publicKey
  );
  console.log("recipient token account", tokenAccountRecipient.address);

  // transfering tokens from creator to recipient
  const transfer_signature = await transfer(
    connection,
    wallet,
    tokenAccount.address,
    tokenAccountRecipient.address,
    wallet,
    1000000000
  );
  console.log("transfer transaction hash", transfer_signature);

}


run();