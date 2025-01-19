import { useState } from "react";
import Header from "./components/Header.jsx";

import "./App.css";

function App() {
  const [ethAddress, setEthAddress] = useState("");
  const [number, setNumber] = useState("");

  const handleEthAddressChange = (e) => setEthAddress(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);

  const isValidEthAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleEthSubmit = () => {
    if (isValidEthAddress(ethAddress)) {
      alert(`Ethereum address submitted: ${ethAddress}`);
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
  const handleNavigate = () => {
    window.location.href = "https://faucet.vanarchain.com/"; // Navigate to the specified URL
  };

  return (
    <>
      <Header />

      <div class="parent">
        <div class="container">
          <div class="content">
            <a
              href="https://faucet.vanarchain.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="navigate-btn">Vanguard Faucet</button>
            </a>
            <a
              href="https://explorer-vanguard.vanarchain.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="navigate-btn">Vanguard Explorer</button>
            </a>
          </div>
        </div>
        <h1>Register here: </h1>
        <input
          type="text"
          value={ethAddress}
          onChange={handleEthAddressChange}
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
          onClick={handleEthSubmit}
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
          onChange={handleNumberChange}
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
      </div>
    </>
  );
}

export default App;
