# erc20-token2021

- start dev blockchain
```bash
yarn ganache
```

- migrate to rinkeby
```bash
yarn workspace contract migrate --network rinkeby
```

- start dev blockhain && exec script
```bash
yarn workspace contract ganache
yarn workspace contract migrate:dev && yarn workspace contract start:dev
```

- network console
```bash
yarn workspace contract truffle console --network rinkeby
```

```bash
truffle(rinkeby)> await web3.eth.getAccounts();
truffle(rinkeby)> token2021.balanceOf(accounts[0])
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
truffle(rinkeby)> token2021.claim()
truffle(rinkeby)> token2021.balanceOf(accounts[0])
BN { negative: 0, words: [ 20, <1 empty item> ], length: 1, red: null }
```
