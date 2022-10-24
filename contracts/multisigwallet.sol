pragma solidity ^0.8.17;    // Maybe can use a newer version?

contract MultiSigWallet {

    struct Transaction {
        bool exists;
        mapping (address => bool) voteType;

        // Check if voteType[address] is null wd suffice, I think
        // mapping (address => bool) hasVoted;

        uint amount;
        uint expiryTime;
        address destination;
        address transaction;
        bool isConfirmed;
        bool isProcessed;
    }

    mapping (address => bool) isOwner;
    uint public minVotes;
    uint public expiryDuration;
    uint public transactionCount;
    mapping (uint => Transaction) public transactions;

    constructor (address[] memory _owners, uint _minVotes, uint _duration) {
        require(_owners.length > 0, "The wallet must have at least one owner.");
        require(minVotes <= _owners.length, "The minimum number of votes cannot exceed the number of owners.");

        minVotes = _minVotes;
        for (uint i = 0; i < _owners.length; ++i) {
            isOwner[_owners[i]] = true;
        }

        expiryDuration = block.timestamp + _duration;
    }

    function voteTransaction(uint _id, bool _approve) public {
        require(isOwner[msg.sender], "You are not an owner of this wallet.");
        require(transactions[_id].exists, "The transaction does not exist.");
        require(!transactions[_id].isProcessed, "This transaction has already been processed.");
        require(block.timestamp <= expiryDuration, "This transaction has expired.");
        // Add the below require if it is deemed unsuitable for people to change their vote on a transaction
        // require(!transactions[_id].hasVoted[msg.sender], "You have already voted for this transaction.");

        transactions[_id].voteType[msg.sender] = _approve;
    }

    function addTransaction(address _destination, uint _amount) public {
        require(isOwner[msg.sender], "You are not an owner of this wallet.");
        Transaction storage t = transactions[transactionCount];
        t.exists = true;
        t.amount = _amount;
        t.expiryTime = block.timestamp + (expiryDuration * 1 seconds);
        t.destination = _destination;
        t.isConfirmed = false;
        t.isProcessed = false;
        transactionCount += 1;
    }
}