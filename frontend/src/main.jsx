"use-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { ThirdwebProvider } from "thirdweb/react";
import { RaffleContextProvider } from "./context/raffleContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThirdwebProvider clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}>
      <RaffleContextProvider>
        <App />
      </RaffleContextProvider>
    </ThirdwebProvider>
  </StrictMode>
);
