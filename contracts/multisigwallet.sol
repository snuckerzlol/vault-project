pragma solidity ^0.4.15;

contract Vault {
    // An instance of a multi-signature wallet

    struct Transaction {
        string name;
        mapping(address => bool) hasVoted;
        mapping(address => bool) vote;
        uint256 expiryTime;
        address payable to;
    }

    // State variables
    mapping(address => bool) public isOwner; // Stores owners of wallet
    uint256 public minVotes; // Stores the minimm votes to approve a tx
    mapping(uint256 => Transaction) public pendingTransactions;
    mapping(uint256 => Transaction) public processedTransactions;

    // Errors

    // Events

    // Functions
}
