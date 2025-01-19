import React from "react";
import "../App.css";
import { ConnectButton } from "thirdweb/react";
import { client, vanguard } from "../client";

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://cdn-testnet.vanarchain.com/assets/images/vanguard-logo.svg"
        alt="Vanar Logo"
        className="logo"
      />

      <ConnectButton client={client} chain={vanguard} />
    </div>
  );
};

export default Header;
