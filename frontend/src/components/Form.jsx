import React, { useState } from "react";
import "../App.css";
import { ConnectButton } from "thirdweb/react";
import { client, vanguard } from "../client";

const Form = () => {
  const [number, setNumber] = useState("");

  const handleEthSubmit = () => {};

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
        Register
      </button>

      <h1>Guess the imposter:</h1>

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
