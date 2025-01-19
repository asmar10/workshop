// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Raffle {
    address[] public participants;
    uint256 public entryFee = 1 ether;  
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    receive() external payable {
        require(msg.value == entryFee, "Incorrect entry fee");
        participants.push(msg.sender);
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        revert("Please send Ether without any data");
    }

    function getRandomWinner() internal view onlyOwner returns (address) {
        require(participants.length > 0, "No participants in the raffle");
        
        uint256 random = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
        return participants[random % participants.length];
    }

    function drawWinnerAndSendPrize() public onlyOwner {
        address winner = getRandomWinner();
        (bool sent, ) = winner.call{value: address(this).balance}("");
        require(sent, "Failed to send prize");
        delete participants;
    }

    function getTotalAmount() public view returns (uint256) {
        return address(this).balance;
    }
}
