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
          backgroundColor: "#4CAF50",
          color: "white",
          width: "50%",
          marginBottom: "20px",
        }}
        disabled={isLoading}
      >
        Enter lottery
      </button>

      <p>Lottery Address: {CONTRACT_CONFIG.raffleContractAddress}</p>
    </>
  );
};

export default Form;
