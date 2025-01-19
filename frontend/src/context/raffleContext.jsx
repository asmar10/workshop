"use-client";
import { ethers } from "ethers";

import { createContext, useContext, useEffect, useState } from "react";
import { useSigner } from "@thirdweb-dev/react"; // Import Thirdweb provider
import { raffleContractAbi } from "../utils/abis";
import { CONTRACT_CONFIG } from "../config";

// const signer = useSigner();

// Create the context
const RaffleContext = createContext(undefined);
export const RaffleContextProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);

  const getRaffleContract = (isSigner = false) => {
    const provider = new ethers.providers.JsonRpcProvider(
      CONTRACT_CONFIG.vanguardRpc
    );
    let contract;

    if (isSigner) {
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();
      contract = new ethers.Contract(
        CONTRACT_CONFIG.raffleContractAddress,
        raffleContractAbi,
        signer
      );
      return contract;
    }

    contract = new ethers.Contract(
      CONTRACT_CONFIG.raffleContractAddress,
      raffleContractAbi,
      provider
    );
    return contract;
  };

  const transaction = {
    to: CONTRACT_CONFIG.raffleContractAddress,
    value: ethers.utils.parseEther("1"),
    gasLimit: 2100000,
  };

  const sendEther = async () => {
    try {
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();
      console.log("Sending transaction...");
      // Send the transaction
      const txResponse = await signer.sendTransaction(transaction);
      console.log("Transaction response:", txResponse);

      // Wait for the transaction to be mined
      const receipt = await txResponse.wait();
      console.log("Transaction receipt:", receipt);
      await getAmount();
    } catch (error) {
      console.log(error);
      alert("Transaction failed");
    }
  };
  const getAmount = async () => {
    try {
      const contract = getRaffleContract();
      let _amount = await contract.getTotalAmount(); // This needs to be a contract call
      console.log(_amount);
      setAmount(_amount.toString()); // Convert BigNumber to string for state management
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const _getAmount = async () => {
  //     await getAmount();
  //   };
  //   _getAmount();
  // }, []);

  const contextValues = { sendEther, amount };

  return (
    <RaffleContext.Provider value={contextValues}>
      {children}
    </RaffleContext.Provider>
  );
};

// Custom hook to use the RaffleContext
export const useRaffleContext = () => {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error(
      "useRaffleContext must be used within a RaffleContextProvider"
    );
  }
  return context;
};
