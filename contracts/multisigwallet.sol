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
    uint public transactionCount;
    string public safeName;
    mapping (uint => Transaction) public transactions;

    constructor (string memory _safeName, uint _minVotes, address[] memory _owners) {
        require(_owners.length > 0, "The wallet must have at least one owner.");
        require(_minVotes <= _owners.length, "The minimum number of votes cannot exceed the number of owners.");

        safeName = _safeName;
        minVotes = _minVotes;
        for (uint i = 0; i < _owners.length; ++i) {
            isOwner[_owners[i]] = true;
        }

        // expiryDuration = block.timestamp + _duration;
    }

    function setMinVotes(uint _minVotes) public {
        minVotes = _minVotes;
    }

    function setSafeName(string memory _safeName) public {
        safeName = _safeName;
    }

    function voteTransaction(uint _id, bool _approve) public {
        require(isOwner[msg.sender], "You are not an owner of this wallet.");
        require(transactions[_id].exists, "The transaction does not exist.");
        require(!transactions[_id].isProcessed, "This transaction has already been processed.");
        require(block.timestamp <= transactions[_id].expiryTime, "This transaction has expired.");
        // require(block.timestamp <= expiryDuration, "This transaction has expired.");
        // Add the below require if it is deemed unsuitable for people to change their vote on a transaction
        // require(!transactions[_id].hasVoted[msg.sender], "You have already voted for this transaction.");

        transactions[_id].voteType[msg.sender] = _approve;
    }

    function addTransaction(address _destination, uint _amount, uint _duration) public {
        require(isOwner[msg.sender], "You are not an owner of this wallet.");
        Transaction storage t = transactions[transactionCount];
        t.exists = true;
        t.amount = _amount;
        t.expiryTime = block.timestamp + (_duration * 1 seconds);
        t.destination = _destination;
        t.isConfirmed = false;
        t.isProcessed = false;
        transactionCount += 1;
    }

    function executeTransaction(uint _id, address[] memory _owners) public payable{
        require(isOwner[msg.sender]=true, "Only owners can execute transactions.");
        uint numApproved = 0;
        for (uint i = 0; i < _owners.length; ++i) {
            if (transactions[_id].voteType[_owners[i]]=true) {
                numApproved += 1; 
            }
        }
        require(numApproved > minVotes, "Number of votes has not been reached.");
        require(transactions[_id].amount!=0, "Transaction does not send anything.");
        require(!transactions[_id].isProcessed, "The transactions has already been processed.");
        (bool sucessfulTransaction, bytes memory returnBytes) = transactions[_id].destination.call{value: transactions[_id].amount}("");
        
        require(sucessfulTransaction = true, "Transaction was unsuccessful");
        
        transactions[_id].isProcessed = true;
    }
}
