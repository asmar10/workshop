// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// Custom errors
error InvalidFee();
error ExistingEntry();
error RaffleNotOpen();
error NotAllowed();

import "hardhat/console.sol";

contract Raffle {
    //STATE VARIABLES
    address[] private participants;
    uint256 private entryFee = 1 ether;
    address private owner;
    bool private isRaffleOpen = false;
    mapping(address => bool) private existingParticipants;

    // EVENTS
    event EnteredLottery(address indexed participant, uint256 amount);
    event WinnerDrawn(address indexed winner, uint256 prizeAmount);
    event RaffleStatusChanged(bool newStatus);

    //MODIFIERS
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier raffleOpen() {
        require(isRaffleOpen, "Raffle is not open");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //WRITE FUNCTIONS
    function toggleRaffleOpen() external onlyOwner {
        isRaffleOpen = !isRaffleOpen;
        emit RaffleStatusChanged(isRaffleOpen);
    }

    function enterLottery() external payable raffleOpen {
        address _sender = msg.sender;
        if (existingParticipants[_sender]) revert ExistingEntry();

        uint256 _fee = msg.value;
        if (_fee != entryFee) revert InvalidFee();

        (bool sent, ) = payable(address(this)).call{value: _fee}("");
        require(sent, "Transfer failed");

        existingParticipants[_sender] = true;
        participants.push(_sender);

        emit EnteredLottery(_sender, _fee);
    }

    // Fallback function is called when msg.data is not empty
    receive() external payable {}

    function getRandomWinner() private view returns (uint256) {
        uint256 random = uint256(
            keccak256(abi.encodePacked(block.timestamp, participants))
        );

        return random % participants.length;
    }

    function drawWinnerAndSendPrize() external onlyOwner {
        require(!isRaffleOpen, "Ongoing");
        require(address(this).balance > 0, "No rewards");
        uint256 winnerId = getRandomWinner();
        address winner = participants[winnerId];
        uint256 prizeAmount = address(this).balance;
        (bool sent, ) = payable(winner).call{value: prizeAmount}("");
        require(sent, "Failed to send prize");
        emit WinnerDrawn(winner, prizeAmount);
        isRaffleOpen = false;
        emit RaffleStatusChanged(isRaffleOpen);
    }

    // Function to reset the raffle for a new round
    function resetRaffle() external onlyOwner {
        if (isRaffleOpen || address(this).balance > 0) revert NotAllowed();
        for (uint256 i = 0; i < participants.length; i++) {
            existingParticipants[participants[i]] = false;
        }
        isRaffleOpen = false;
        delete participants;
    }

    function emergencyWithdraw() external onlyOwner {
        (bool sent, ) = payable(owner).call{value: address(this).balance}("");
        require(sent, "Withdraw failed");
    }

    function updateOwner(address _owner) external onlyOwner {
        require(_owner != address(0) && _owner != owner, "Invalid Address");
        owner = _owner;
    }

    //READ FUNCTIONS
    function getIsRaffleOpen() external view returns (bool) {
        return isRaffleOpen;
    }

    function getTotalParticipants() external view returns (uint256) {
        return participants.length;
    }

    function getTotalReward() external view returns (uint256) {
        return address(this).balance;
    }

    function isParticipant(address _address) external view returns (bool) {
        return existingParticipants[_address];
    }

    function getEntryFee() external view returns (uint256) {
        return entryFee;
    }

    function Owner() external view returns (address) {
        return owner;
    }
}
