import React from "react";
import "../App.css";

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://cdn-testnet.vanarchain.com/assets/images/vanguard-logo.svg"
        alt="Vanar Logo"
        class="logo"
      />

      <button className="connect-wallet-btn">Connect Wallet</button>
      
    </div>
  );
};

export default Header;
