"use-client";

import "../App.css";

import { useRaffleContext } from "../context/raffleContext";
import { CONTRACT_CONFIG } from "../config";
import { useState } from "react";
import {
  getErrorMessage,
  getEthFrom,
  getWeiFrom,
  NotifyError,
} from "../context/helper";
import { ethers } from "ethers";

const Form = () => {
  const { enterLottery, amount, participants, account } = useRaffleContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleEthSubmit = async () => {
    try {
      setIsLoading(true);
      const provider = new ethers.providers.JsonRpcProvider(
        CONTRACT_CONFIG.vanguardRpc
      );

      let _balance = await provider.getBalance(account.address);
      _balance = Number(getEthFrom(_balance._hex));

      if (_balance < 1) throw new Error("Insufficient Funds");

      await enterLottery();
    } catch (err) {
      const _msg = getErrorMessage(err);
      NotifyError(_msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Raffle </h1>
      <h2>Current Prize: {amount} VANRY </h2>
      <h2>Number of Participants: {(participants)}</h2>

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
