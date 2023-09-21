import { useWeb3Modal } from "@web3modal/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { getAccount } from '@wagmi/core';

const WalletButton = ({ onWalletConnect }) => {
    const { open } = useWeb3Modal();
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState('');
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    
    const { data } = useBalance({
        address: account
    });
    const label = isConnected && data ? account : "Connect";

    // Funciones de cartera 
    async function onOpen() {
        setLoading(true);
        await open();
        setLoading(false);
    }

    const onClick = async () => {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }
    const walletInfo = useMemo(() => {
        return { address: '', isConnected: false };
    }, []);

    // recolectar información de cartera para uso en otros lados (App.js principalmente)
    const memoizedOnWalletConnect = useCallback((info) => {
        onWalletConnect(info);
    }, [onWalletConnect]);

    // useEffect para actualizar información de render 

    useEffect(() => {
        setAccount(getAccount().address)
        walletInfo.isConnected = isConnected;
        memoizedOnWalletConnect(walletInfo);
    }, [isConnected, memoizedOnWalletConnect, walletInfo]);

    useEffect(() => {
        walletInfo.address = account;
        memoizedOnWalletConnect(walletInfo);
    }, [account, memoizedOnWalletConnect, walletInfo]);

    return (
        <button className="btn btn-primary" onClick={onClick} disabled={loading}>
            {loading ? "Loading..." : label}
        </button>
    );
}

export default WalletButton;
