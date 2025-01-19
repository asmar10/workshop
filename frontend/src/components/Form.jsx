"use-client";
import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import "../App.css";
import { ConnectButton } from "thirdweb/react";
import { client, vanguard } from "../client";
import { useRaffleContext } from "../context/raffleContext";

const Form = () => {
  const { sendEther, amount } = useRaffleContext();

  const handleEthSubmit = async () => {
    await sendEther();
  };

  return (
    <>
      <h1>Raffle </h1>
      <h2>Current Reward: {amount} </h2>

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
      >
        Enter lottery
      </button>
    </>
  );
};

export default Form;
