pragma solidity ^0.4.15;    // Maybe can use a newer version?

contract MultiSigWallet {

    struct Transaction {
        bool exists;
        mapping (address => bool) voteType;
        mapping (address => bool) hasVoted;
        uint expiryTime;
        address destination;
        address transaction;
        bool isConfirmed;
        bool isProcessed;
    }

    mapping public (address => bool) isOwner;
    uint public minVotes;
    uint public expiryTime;
    mapping (uint => Transaction) public transactions;

    constructor (address[] _owners, uint _minVotes, uint _duration) public {
        require(_owners.length > 0, "The wallet must have at least one owner.");
        require(minVotes <= _owners.length, "The minimum number of votes cannot exceed the number of owners.");

        minVotes = _minVotes;
        for (uint i = 0; i < _owners.length; ++i) {
            isOwner[_owners[i]] = true;
        }

        expiryTime = block.timestamp + _duration;
    }

    function voteTransaction(uint id, bool approve) {
        require(isOwner[msg.sender], "You are not an owner of this wallet.");
        require(transactions[id].exists, "The transaction does not exist.");
        require(!transactions[id].isProcessed, "This transaction has already been processed.");
        require(block.timestamp <= expiryTime, "This transaction has expired.");
        // Add the below require if it is deemed unsuitable for people to change their vote on a transaction
        // require(!transactions[id].hasVoted[msg.sender], "You have already voted for this transaction.");

        transactions[id].hasVoted[msg.sender] = true;
        transactions[id].voteType[msg.sender] = approve;
    }
}