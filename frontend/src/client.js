// src/client.ts
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export const vanguard = defineChain({
  id: 78600,
  rpc: "https://rpc-vanguard.vanarchain.com",
  explorers: "https://explorer-vanguard.vanarchain.com/",
});

// Define the custom Vanar chain
