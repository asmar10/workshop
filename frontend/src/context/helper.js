import { ethers } from "ethers";
import toast from "react-hot-toast";

export function shortenWalletAddress(address, length = 3) {
  if (!address) {
    return "";
  }

  const prefix = address.startsWith("0x") ? "0x" : "";
  const mainAddress = prefix ? address.slice(2) : address;

  if (mainAddress.length <= length * 2) {
    return address;
  }

  return `${prefix}${mainAddress.slice(0, length)}...${mainAddress.slice(
    -length
  )}`;
}

export function truncateAmount(value) {
  const parts = value.split(".");
  if (parts.length === 2 && parts[1].length > 6) {
    return Number(`${parts[0]}.${parts[1].substring(0, 6)}`);
  }
  return Number(value);
}

const errorMessages = {
  InvalidFee: "The fee specified is invalid.",
  ExistingEntry: "Already a Participant",
  RaffleNotOpen: "The raffle is not currently open.",
  NotAllowed: "This action is not allowed.",
};

const iface = new ethers.utils.Interface([
  "error InvalidFee()",
  "error ExistingEntry()",
  "error RaffleNotOpen()",
  "error NotAllowed()",
]);

export const getErrorMessage = (_error) => {
  try {
    console.log(
      {
        message: _error?.message,
        code: _error?.code,
        errorArgs: _error?.errorArgs,
        errorName: _error?.errorName,
        reason: _error?.reason,
        data: _error?.data,
      },
      "error details"
    );
    const errorData = JSON.parse(JSON.stringify(_error));
    console.log(errorData, "data", Object.keys(errorData).length);
    if (Object.keys(errorData).length > 0) {
      if (errorData?.message || errorData?.code === 4001)
        return errorData.message;

      if (errorData?.error?.message) return errorData?.error?.message;
      if (errorData?.errorName) {
        return errorMessages[errorData.errorName] || "Something went wrong.";
      }

      const errorDataHex =
        errorData?.error?.data?.originalError?.data || _error?.data;
      if (errorDataHex) {
        try {
          const decodedError = iface.parseError(errorDataHex);
          return errorMessages[decodedError.name] || "Something went wrong.";
        } catch (decodeError) {
          return "Something went wrong.";
        }
      }

      if (errorData.reason) return errorData.reason;
      return "Transaction Reverted";
    } else {
      if (!_error?.message) return "Transaction Reverted";
      const message = _error.message;

      // Regex to extract specific fields
      const codeMatch = message.match(/code=([a-zA-Z_]+)/); // Extracts "code=..."
      const errorNameMatch = message.match(/errorName="([^"]+)"/); // Extracts errorName="..."
      const reasonMatch = message.match(/reason=([^,]+)/); // Extracts reason=...

      // Extracted values
      const code = codeMatch ? codeMatch[1] : null;
      const errorName = errorNameMatch ? errorNameMatch[1] : null;
      const reason = reasonMatch ? reasonMatch[1] : null;
      console.log(code, errorName, reason);
      // Handle known cases
      if (code === "ACTION_REJECTED") return "User rejected transaction";
      if (errorName && errorMessages[errorName])
        return errorMessages[errorName];
      if (reason && reason !== "null") return reason;

      // // Fallback to raw message if no match
      if (!code && !errorName && !reason && message) return message;
      else return "Transaction Reverted";
    }
  } catch (error) {
    return "Transaction Reverted";
  }
};

export const getEthFrom = (wei) => {
  return ethers.utils.formatEther(wei).toString();
};
export const getWeiFrom = (eth) => {
  return ethers.utils.parseEther(eth).toString();
};
export const getCustomWeiFrom = (eth, decimals) => {
  return ethers.utils.parseUnits(eth, decimals).toString();
};
export const getCustomEthFrom = (eth, decimals) => {
  return ethers.utils.formatUnits(eth, decimals).toString();
};
export const getCurrentTimeInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

const notifySuccessToastId = { current: null };
const errorToastId = { current: null };

export const NotifySuccess = (msg) => {
  if (notifySuccessToastId.current) {
    toast.dismiss(notifySuccessToastId.current);
  }

  notifySuccessToastId.current = toast.success(msg);
};

export const NotifyError = (msg) => {
  if (errorToastId.current) {
    toast.dismiss(errorToastId.current);
  }

  errorToastId.current = toast.error(msg);
};

