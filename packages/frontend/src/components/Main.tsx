import * as React from 'react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MetaMaskOnboarding from '@metamask/onboarding';
import Token2021 from 'contract/build/contracts/Token2021.json';

declare global {
  interface Window {
    ethereum: any;
  }
}

const { isMetaMaskInstalled } = MetaMaskOnboarding;

Object.assign(window, { isMetaMaskInstalled });

const currentUrl = new URL(window.location.href);
const forwarderOrigin =
  currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined;

Object.assign(window, {
  ethers,
  MetaMaskOnboarding,
});

// https://github.com/MetaMask/test-dapp
const initialize = async () => {
  try {
    // ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    // hstFactory = new ethers.ContractFactory(
    //   hstAbi,
    //   hstBytecode,
    //   ethersProvider.getSigner(),
    // )
  } catch (error) {
    console.error(error);
  }

  let onboarding: MetaMaskOnboarding;
  try {
    onboarding = new MetaMaskOnboarding({ forwarderOrigin });
  } catch (error) {
    console.error(error);
  }

  let accounts: string[];

  const isMetaMaskConnected = () => accounts && accounts.length > 0;

  const startOnboarding = () => {
    onboarding.startOnboarding();
  };

  async function getNetworkAndChainId() {
    try {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      // handleNewChain(chainId);

      const networkId = await window.ethereum.request({
        method: 'net_version',
      });
      // handleNewNetwork(networkId);
    } catch (err) {
      console.error(err);
    }
  }

  if (isMetaMaskInstalled()) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    getNetworkAndChainId();

    // window.ethereum.on('chainChanged', handleNewChain)
    // window.ethereum.on('networkChanged', handleNewNetwork)
    // window.ethereum.on('accountsChanged', handleNewAccounts);

    try {
      const newAccounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      // handleNewAccounts(newAccounts);
    } catch (err) {
      console.error('Error on init when getting accounts', err);
    }
  }
};

const ethersProvider = new ethers.providers.Web3Provider(
  window.ethereum,
  'any'
);

const contractAddress = '0xd8EC4F3364A6d6A7a68F0FE6705E9AA92aa230b4'; // rinkeby

window.contract = new ethers.Contract(
  contractAddress,
  Token2021.abi,
  ethersProvider
);

window.provider = ethersProvider;

window.ethers = ethers;

const claim = async () => {
  // useProvider();
  const ethersProvider = new ethers.providers.Web3Provider(
    window.ethereum,
    'any'
  );
  // ethersProvider.getSigner().getAddress().then(x => console.log({x}))

  // process.env.TOKEN2021_CONTRACT_ADDRESS
  const contractAddress = '0xd8EC4F3364A6d6A7a68F0FE6705E9AA92aa230b4'; // rinkeby

  const contract = new ethers.Contract(
    contractAddress,
    Token2021.abi,
    ethersProvider.getSigner()
  );

  await contract.claim();
};

const balanceOf = async (
  account: string = '0x4431a11dcc45ada7e82985b2de3889c86fcb544f'
) => {
  // useProvider();
  const ethersProvider = new ethers.providers.Web3Provider(
    window.ethereum,
    'any'
  );

  // process.env.TOKEN2021_CONTRACT_ADDRESS
  const contractAddress = '0xd8EC4F3364A6d6A7a68F0FE6705E9AA92aa230b4'; // rinkeby

  const contract = new ethers.Contract(
    contractAddress,
    Token2021.abi,
    ethersProvider
  );

  const balance = (await contract.balanceOf(account)).toNumber();

  return balance;
};

const connect = async () => {
  window.ethereum.on('accountsChanged', (x) => console.log(x));

  try {
    const newAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(newAccounts);
    // throw new Error('x');
    return newAccounts;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const Main: React.FC<any> = () => {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    window.ethereum.on('accountsChanged', setAccounts);
  }, []);

  return (
    <div>
      <h1>Main</h1>
      <hr />
      <div>
        <button
          type="button"
          onClick={(e) => {
            claim();
          }}
        >
          claim
        </button>
        <button
          type="button"
          onClick={(e) => {
            balanceOf(accounts[0]).then((balance) => {
              setBalance(balance);
            });
          }}
        >
          Get my balance
        </button>
        {balance !== null && <pre>balance: {balance}</pre>}
        <button
          type="button"
          disabled={connected || loading}
          onClick={(e) => {
            setLoading(true);
            connect()
              .then((accounts) => {
                setAccounts(accounts);
                setConnected(true);
              })
              .catch((error) => {
                setError(error);
              })
              .finally(() => setLoading(false));
          }}
        >
          Connect with MetaMask
        </button>
        <ul>
          {accounts.map((account, idx) => (
            <li key={idx}>{account}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
