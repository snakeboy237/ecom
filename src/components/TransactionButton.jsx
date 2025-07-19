import { useState } from "react";
import { ethers } from "ethers";

export default function TransactionButton({ provider }) {
  // UI status: idle | confirming | pending | success | failed
  const [status, setStatus] = useState("idle");

  const handleTransaction = async () => {
    // Guard clause: no wallet connected
    if (!provider) return alert("Please connect wallet first!");

    // Step 1: Waiting for user confirmation in MetaMask
    setStatus("confirming");
    try {
      const signer = provider.getSigner();

      // Dummy transaction to a burn address (for testing)
      const tx = await signer.sendTransaction({
        to: "0x000000000000000000000000000000000000dead",
        value: ethers.utils.parseEther("0.001"), // ethers v5 syntax
      });

      // Step 2: Transaction broadcasted, waiting for network confirmation
      setStatus("pending");
      await tx.wait();

      // Step 3: Transaction confirmed successfully
      setStatus("success");
    } catch (error) {
      // Handles user rejection or any RPC/network failure
      console.error(error);
      setStatus("failed");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleTransaction}>Mint / Buy</button>

      {/* Dynamic UI feedback based on transaction lifecycle */}
      {status === "confirming" && <p>Confirm in wallet...</p>}
      {status === "pending" && <p>Transaction pending...</p>}
      {status === "success" && <p>✅ Success! Minted.</p>}
      {status === "failed" && <p>❌ Transaction failed.</p>}
    </div>
  );
}
