import { useState } from "react";
import Header from "./components/Header.jsx";
import "./App.css";
import Form from "./components/Form.jsx";
import { useConnectionStatus } from "@thirdweb-dev/react";

function App() {
  const connectionStatus = useConnectionStatus();
  console.log(connectionStatus)
  return (
    <>
      <Header />

      <div className="parent">
        <div className="container">
          <div className="content">
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
        <Form />
      </div>
    </>
  );
}

export default App;
