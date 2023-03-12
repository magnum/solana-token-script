# test solana

## generate local keypair

```
solana-keygen new -o [path]
```
ie:

```
solana-keygen new -o /Users/magnum/.config/solana/id.json
```


## setup
```
npm init
npm i @solana/buffer-layout @solana/spl-token @solana/spl-token-swap @solana/web3.js ts-node
npx tsc --init
```