import * as React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import MetaMaskOnboarding from '@metamask/onboarding';

const { isMetaMaskInstalled } = MetaMaskOnboarding;

let ethersProvider;
// let hstFactory

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
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    // hstFactory = new ethers.ContractFactory(
    //   hstAbi,
    //   hstBytecode,
    //   ethersProvider.getSigner(),
    // )
  } catch (error) {
    console.error(error);
  }

  let onboarding;
  try {
    onboarding = new MetaMaskOnboarding({ forwarderOrigin });
  } catch (error) {
    console.error(error);
  }

  let accounts;
  let accountButtonsInitialized = false;

  const isMetaMaskConnected = () => accounts && accounts.length > 0;

  const startOnboarding = () => {
    onboarding.startOnboarding();
  };

  const connect = async () => {
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      handleNewAccounts(newAccounts);
    } catch (error) {
      console.error(error);
    }
  };

  function handleNewAccounts(newAccounts) {
    accounts = newAccounts;
    accountsDiv.innerHTML = accounts;
    if (isMetaMaskConnected()) {
      initializeAccountButtons();
    }
    updateButtons();
  }

  function handleNewChain(chainId) {
    chainIdDiv.innerHTML = chainId;
  }

  function handleNewNetwork(networkId) {
    networkDiv.innerHTML = networkId;
  }

  async function getNetworkAndChainId() {
    try {
      const chainId = await ethereum.request({
        method: 'eth_chainId',
      });
      handleNewChain(chainId);

      const networkId = await ethereum.request({
        method: 'net_version',
      });
      handleNewNetwork(networkId);
    } catch (err) {
      console.error(err);
    }
  }

  if (isMetaMaskInstalled()) {
    ethereum.autoRefreshOnNetworkChange = false;
    getNetworkAndChainId();

    // ethereum.on('chainChanged', handleNewChain)
    // ethereum.on('networkChanged', handleNewNetwork)
    ethereum.on('accountsChanged', handleNewAccounts);

    try {
      const newAccounts = await ethereum.request({
        method: 'eth_accounts',
      });
      handleNewAccounts(newAccounts);
    } catch (err) {
      console.error('Error on init when getting accounts', err);
    }
  }
};

const connect = async () => {
  try {
    const newAccounts = await ethereum.request({
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

// function handleNewAccounts(newAccounts) {
//   if (isMetaMaskConnected()) {
//     initializeAccountButtons()
//   }
//   updateButtons()
// }

export const Main: React.FC<any> = () => {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>Main</h1>
      <hr />
      <div>
        <button
          type="button"
          disabled={connected}
          onClick={(e) => {
            // setConnected(true);
            connect()
              .then((accounts) => {
                setAccounts(accounts);
              })
              .catch((error) => console.log('err', error));
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
