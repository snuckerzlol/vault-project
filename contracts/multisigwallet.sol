pragma solidity ^0.8.17; // Maybe can use a newer version?

contract MultiSigWallet {
    struct Transaction {
        bool exists;
        mapping(address => bool) voteType;
        mapping(address => bool) hasVoted;
        uint256 forVotes;
        uint256 totalVotes;
        uint256 amount;
        uint256 expiryTime;
        address destination;
        address transaction;
        bool isConfirmed;
        bool isProcessed;
    }

    mapping(address => bool) isOwner;
    uint256 public minVotes;
    uint256 public transactionCount;
    string public safeName;
    mapping(uint256 => Transaction) public transactions;

    constructor(
        string memory _safeName,
        uint256 _minVotes,
        address[] memory _owners
    ) {
        require(_owners.length > 0, "The wallet must have at least one owner.");
        require(
            _minVotes <= _owners.length,
            "The minimum number of votes cannot exceed the number of owners."
        );

        safeName = _safeName;
        minVotes = _minVotes;
        for (uint256 i = 0; i < _owners.length; ++i) {
            isOwner[_owners[i]] = true;
        }

        // expiryDuration = block.timestamp + _duration;
    }

    function setMinVotes(uint256 _minVotes) public {
        minVotes = _minVotes;
    }

    function setSafeName(string memory _safeName) public {
        safeName = _safeName;
    }

    function addOwner(address _newOwner) public {
        isOwner[_newOwner] = true;
    }

    function voteTransaction(uint256 _id, bool _approve) public {
        require(isOwner[msg.sender], "You are not an owner of this wallet.");
        require(transactions[_id].exists, "The transaction does not exist.");
        require(
            !transactions[_id].isProcessed,
            "This transaction has already been processed."
        );
        require(
            block.timestamp <= transactions[_id].expiryTime,
            "This transaction has expired."
        );
        // Add the below require if it is deemed unsuitable for people to change their vote on a transaction
        // require(!transactions[_id].hasVoted[msg.sender], "You have already voted for this transaction.");

        if (!transactions[_id].hasVoted[msg.sender]) {
            transactions[_id].hasVoted[msg.sender] = true;
            ++transactions[_id].totalVotes;
        }

        if (!transactions[_id].voteType[msg.sender] && _approve) {
            ++transactions[_id].forVotes;
        } else if (transactions[_id].voteType[msg.sender] && !_approve) {
            --transactions[_id].forVotes;
        } // else the vote was the same as before so no change needed

        transactions[_id].voteType[msg.sender] = _approve;
    }

    function addTransaction(
        address _destination,
        uint256 _amount,
        uint256 _duration
    ) public {
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

    function executeTransaction(uint256 _id) public payable {
        require(isOwner[msg.sender], "Only owners can execute transactions.");
        // uint256 numApproved = 0;
        // for (uint256 i = 0; i < _owners.length; ++i) {
        //     if (transactions[_id].voteType[_owners[i]] = true) {
        //         numApproved += 1;
        //     }
        // }
        require(
            transactions[_id].forVotes >= minVotes,
            "Number of votes has not been reached."
        );
        require(
            transactions[_id].amount != 0,
            "Transaction does not send anything."
        );
        require(
            !transactions[_id].isProcessed,
            "The transaction has already been processed."
        );
        (bool sucessfulTransaction, bytes memory returnBytes) = transactions[
            _id
        ].destination.call{value: transactions[_id].amount}("");

        require(sucessfulTransaction, "Transaction was unsuccessful");

        transactions[_id].isProcessed = true;
    }
}
