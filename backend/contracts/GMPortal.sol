// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../artifacts/hardhat/console.sol";

contract GmPortal {
    uint256 totalGms;

    uint256 private seed;

    event NewGm(address indexed from, uint256 timestamp, string message);

    struct Gm {
        address gmr; // The address of the user who gmd.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user gmd.
    }

    Gm[] gms;

    mapping(address => uint256) public lastGmdAt;

    constructor() payable {
        console.log(
            "I'm a smart contract. Fully decentralized! And I can pay you now ;)"
        );
    }

    function gm(string memory _message) public {
        require(
            lastGmdAt[msg.sender] + 15 seconds < block.timestamp,
            "Wait 15s"
        );

        lastGmdAt[msg.sender] = block.timestamp;

        totalGms++;
        console.log("%s has gmd!", msg.sender);

        gms.push(Gm(msg.sender, _message, block.timestamp));

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewGm(msg.sender, block.timestamp, _message);
    }

    function getAllGms() public view returns (Gm[] memory) {
        return gms;
    }

    function getTotalGms() public view returns (uint256) {
        return totalGms;
    }
}
