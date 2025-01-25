"use-client";
import { ethers } from "ethers";

import { createContext, useContext, useEffect, useState } from "react";
import { raffleContractAbi } from "../utils/abis";
import { CONTRACT_CONFIG } from "../config";
import {
  getErrorMessage,
  getWeiFrom,
  NotifyError,
  NotifySuccess,
} from "./helper";
import { sendTransaction, getContract, prepareContractCall } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { vanguard, client } from "../client";

const RaffleContext = createContext(undefined);
export const RaffleContextProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);
  const [participants, setParticipants] = useState(0);
  const account = useActiveAccount();

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
    gasLimit: 210000,
  };

  const enterLottery = async () => {
    try {
      const contract = getContract({
        address: CONTRACT_CONFIG.raffleContractAddress,
        chain: vanguard,
        client,
      });
      const transaction = prepareContractCall({
        contract,
        method: "function enterLottery()",
        value: getWeiFrom("1"),
      });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
      });

      // const contract = getRaffleContract(true);

      // await contract.callStatic.enterLottery({
      //   value: getWeiFrom("1"),
      // });

      // let tx = await contract.enterLottery({
      //   value: getWeiFrom("1"),
      // });

      // await tx.wait();

      NotifySuccess("Success!");
      await getAmount();
      await getParticipants();
    } catch (err) {
      console.log(err);
      // const _msg = getErrorMessage(err);
      console.log(JSON.parse(err));
      // NotifyError(err.TransactionError);
    }
  };
  const getAmount = async () => {
    try {
      const contract = getRaffleContract();
      let _amount = await contract.getTotalAmount();
      console.log(_amount);
      setAmount(_amount.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const getParticipants = async () => {
    const contract = getRaffleContract();
    const _res = await contract.getTotalReward();
    console.log(_res, "total participants");
    setParticipants(_res);
  };

  useEffect(() => {
    const _getAmount = async () => {
      await getAmount();
    };
    // _getAmount();
  }, []);

  const contextValues = { enterLottery, amount, participants, account };

  return (
    <RaffleContext.Provider value={contextValues}>
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffleContext = () => {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error(
      "useRaffleContext must be used within a RaffleContextProvider"
    );
  }
  return context;
};
