"use-client";
import { ethers } from "ethers";

import "../App.css";

import { useRaffleContext } from "../context/raffleContext";
import { CONTRACT_CONFIG } from "../config";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const Form = () => {
  const account = useActiveAccount();
  const { enterLottery, amount, participants } = useRaffleContext();
  const [isLoading, setIsLoading] = useState(false);
  console.log(!account);
  const handleEthSubmit = async () => {
    setIsLoading(true);

    await enterLottery();
    setIsLoading(false);
  };

  return (
    <>
      <h1>Raffle </h1>
      <h2>Current Prize: {ethers.utils.formatEther(`${amount}`)} VANRY </h2>
      <h2>Number of Participants: {participants}</h2>

      <button
        onClick={() => handleEthSubmit()}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: isLoading || !account ? "#ada0ea" : "#a08cff", // Conditionally set background color
          color: "white",
          width: "50%",
          marginBottom: "20px",
          opacity: isLoading || !account ? 0.6 : 1, // Adjust opacity based on loading or account status
          cursor: isLoading || !account ? "not-allowed" : "pointer", // Set cursor appropriately
        }}
        disabled={isLoading || !account} // Disable button based on loading or account status
      >
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          "Enter lottery"
        )}
      </button>

      <p>Lottery Address: {CONTRACT_CONFIG.raffleContractAddress}</p>
    </>
  );
};

export default Form;
