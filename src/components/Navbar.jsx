import React, { useState, useEffect } from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import WalletButton from './WalletButton';
import { getAccount } from '@wagmi/core'

const Navbar = () => {

  const localUrl = process.env.REACT_APP_URL;

  const chains = [arbitrum, mainnet, polygon]
  const projectId = '890abdef69deb5dedab5582b5a358517'
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  const [walletData, setWalletData] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const handleWalletConnect = (data) => {
    if(walletData){
      setDropdown(true);
    }
    if (!walletData || !walletData.isConnected) {
      setDropdown(false);
    }
    setWalletData(data);
  }
  
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl" href={localUrl}> Weather Scanner </a>
      </div>
      <div className="navbar-center">

        {dropdown && (
          <div className="dropdown">
            <button className="btn btn-ghost bg-primary">Actions</button>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li> <a href="/"> My flights </a></li>
              <li> <a href="/"> Past Flights </a></li>
            </ul>
          </div>
        )}

      </div>

        <WagmiConfig config={wagmiConfig}>
        <div className='navbar-end'>
          <WalletButton onWalletConnect={handleWalletConnect} />
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </div>
    </WagmiConfig>
      </div>
  )
}

export default Navbar