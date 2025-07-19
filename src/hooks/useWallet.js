import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function useWallet() {
  // Local state for provider, connected account, and current network
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  // Connect MetaMask wallet and set provider + account + network
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    // Create a Web3 provider from MetaMask's injected object
    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get the currently selected account
    const signer = ethProvider.getSigner();
    const address = await signer.getAddress();

    // Store account and provider in state
    setAccount(address);
    setProvider(ethProvider);

    // Fetch the connected network (e.g., homestead, sepolia)
    const net = await ethProvider.getNetwork();
    setNetwork(net.name);
  };

  // Reset wallet state (does not disconnect MetaMask, just clears UI state)
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setNetwork(null);
  };

  useEffect(() => {
    // Skip if MetaMask is not installed
    if (!window.ethereum) return;

    // Listen for account changes in MetaMask and update state
    window.ethereum.on("accountsChanged", async (accounts) => {
      setAccount(accounts.length > 0 ? accounts[0] : null);
    });

    // Listen for network changes and update UI
    window.ethereum.on("chainChanged", async () => {
      if (provider) {
        const net = await provider.getNetwork();
        setNetwork(net.name);
      }
    });
  }, [provider]); // Re-run listener if provider changes

  // Expose wallet connection utilities + state
  return { provider, account, network, connectWallet, disconnectWallet };
}
