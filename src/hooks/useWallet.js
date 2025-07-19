import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function useWallet() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = ethProvider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    setProvider(ethProvider);

    const net = await ethProvider.getNetwork();
    setNetwork(net.name);
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setNetwork(null);
  };

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", async (accounts) => {
      setAccount(accounts.length > 0 ? accounts[0] : null);
    });

    window.ethereum.on("chainChanged", async () => {
      if (provider) {
        const net = await provider.getNetwork();
        setNetwork(net.name);
      }
    });
  }, [provider]);

  return { provider, account, network, connectWallet, disconnectWallet };
}
