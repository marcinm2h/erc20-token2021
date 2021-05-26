# erc20-token2021

- start dev blockchain
```bash
yarn start:ganache
```

- migrate to dev
```bash
yarn migrate --network development
```

- migrate to rinkeby
```bash
yarn migrate --network rinkeby
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
