# erc20-token2021

- start dev blockchain
```bash
yarn ganache
```

- migrate to rinkeby
```bash
yarn migrate --network rinkeby
```

- start dev blockhain && exec script
```bash
yarn ganache
yarn migrate:dev && yarn start:dev
```

- network console
```bash
yarn truffle console --network rinkeby
```

```bash
truffle(rinkeby)> var accounts;
truffle(rinkeby)> web3.eth.getAccounts(function(err,res) { accounts = res; });
truffle(rinkeby)> token2021.balanceOf(accounts[0])
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(rinkeby)> token2021.claim()
truffle(rinkeby)> token2021.balanceOf(accounts[0])
BN { negative: 0, words: [ 20, <1 empty item> ], length: 1, red: null }
```
