import React from "react";
import useWallet from "../hooks/useWallet";
import TransactionButton from "./TransactionButton";

const Home = () => {
  const { provider, account, network, connectWallet, disconnectWallet } = useWallet();

  return (
    <>
      {/* Existing hero section */}
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">New Season Arrivals</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*Wallet Section */}
      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <h2>Blockchain Wallet Integration</h2>

        {!account ? (
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div>
            <p><strong>Wallet:</strong> {account}</p>
            <p><strong>Network:</strong> {network}</p>
            <button className="btn btn-danger" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        )}

        {/*Transaction Button */}
        <TransactionButton provider={provider} />
      </div>
    </>
  );
};

export default Home;
