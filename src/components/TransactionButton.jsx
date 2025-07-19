import { useState } from "react";
import { ethers } from "ethers";

export default function TransactionButton({ provider }) {
  const [status, setStatus] = useState("idle");

  const handleTransaction = async () => {
    if (!provider) return alert("Please connect wallet first!");

    setStatus("confirming");
    try {
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0x000000000000000000000000000000000000dead",
        value: ethers.utils.parseEther("0.001"), //v5 syntax
      });

      setStatus("pending");
      await tx.wait();

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleTransaction}>Mint / Buy</button>

      {status === "confirming" && <p>Confirm in wallet...</p>}
      {status === "pending" && <p>Transaction pending...</p>}
      {status === "success" && <p>Success! Minted.</p>}
      {status === "failed" && <p>Transaction failed.</p>}
    </div>
  );
}
