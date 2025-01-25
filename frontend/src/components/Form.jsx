"use-client";
import { ethers } from "ethers";

import "../App.css";

import { useRaffleContext } from "../context/raffleContext";
import { CONTRACT_CONFIG } from "../config";
import { useState } from "react";

const Form = () => {
  const { enterLottery, amount, participants } = useRaffleContext();
  const [isLoading, setIsLoading] = useState(false);

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
          backgroundColor: isLoading ? "#A5D6A7" : "#4CAF50",
          color: "white",
          width: "50%",
          marginBottom: "20px",
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
        disabled={isLoading}
        class="disabled:opacity-60 disabled:cursor-not-allowed"
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
