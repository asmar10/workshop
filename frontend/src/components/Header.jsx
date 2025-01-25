import React from "react";
import "../App.css";
import { ConnectButton } from "thirdweb/react";
import { client, vanguard } from "../client";

import { inAppWallet, createWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet({
    auth: {
      options: ["email"],
    },
  }),
  createWallet("io.metamask"),
];

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://cdn-testnet.vanarchain.com/assets/images/vanguard-logo.svg"
        alt="Vanar Logo"
        className="logo"
      />

      <ConnectButton
        client={client}
        wallets={wallets}
        chain={vanguard}
        connectModal={{ size: "compact" }}
      />
    </div>
  );
};

export default Header;
