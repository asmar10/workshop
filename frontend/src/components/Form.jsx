import React, { useState } from "react";
import "../App.css";
import { ConnectButton } from "thirdweb/react";
import { client, vanguard } from "../client";

const Form = () => {
  const [ethAddress, setEthAddress] = useState("");
  const [number, setNumber] = useState("");

  const isValidEthAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleEthSubmit = (address) => {
    if (isValidEthAddress(address)) {
      alert(`Ethereum address submitted: ${address}`);
    } else {
      alert("Invalid Ethereum address!");
    }
  };

  const handleNumberSubmit = () => {
    if (number) {
      alert(`Number submitted: ${number}`);
    } else {
      alert("Please enter a number!");
    }
  };

  return (
    <>
      <h1>Register here: </h1>
      <input
        type="text"
        value={ethAddress}
        onChange={(e) => setEthAddress(e.target.value)}
        placeholder="Enter Ethereum address"
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "70%",
          marginBottom: "10px",
        }}
      />
      {ethAddress !== "" && (
        <p style={{ color: isValidEthAddress(ethAddress) ? "green" : "red" }}>
          {isValidEthAddress(ethAddress)
            ? "Valid Ethereum address"
            : "Invalid Ethereum address"}
        </p>
      )}
      <button
        onClick={() => handleEthSubmit(ethAddress)}
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
        Register
      </button>

      <h1>Guess the imposter:</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter ID"
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "50%",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleNumberSubmit}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "white",
          width: "50%",
        }}
      >
        Submit
      </button>
    </>
  );
};

export default Form;
