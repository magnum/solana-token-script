# test solana

## setup
### generate local keypair (wallet)

```
solana-keygen new -o [path]
```
ie:

```
solana-keygen new -o /Users/magnum/.config/solana/id.json
```

### airdop some funds
```
solana airdrop 1 <address>  --url https://api.devnet.solana.com
```
or simply 
```
solana airdrop 1
```

### project and libraries
```
npm init
npm i @solana/buffer-layout @solana/spl-token @solana/spl-token-swap @solana/web3.js ts-node
npx tsc --init
```

## run
```
npx ts-node spl_token.ts
```

## links
* solscan https://solscan.io/ 