pragma solidity ^0.4.15;

contract MultiSigWallet {
    address[] public owners;
    uint public minVotes;
    uint public expiryDuration;
    mapping (uint => Transaction) public pendingTransactions;
    mapping (uint => Transaction) public confirmedTransactions;

    struct Transaction {
        mapping (address => uint) voteType;
        uint expiryTime;
        address destination;
        address transaction;
        string name;
    }

    constructor (address[] _owners, uint _minVotes) public {
        owners = _owners;
        minVotes = _minVotes;
    }
}
