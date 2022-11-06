pragma solidity ^0.8.17; // Maybe can use a newer version?

contract MultiSigWallet {
    struct Transaction {
        bool exists;
        mapping(address => bool) voteType;
        mapping(address => bool) hasVoted;
        uint256 forVotes;
        uint256 totalVotes;
        uint256 minVotes;
        uint256 amount;
        uint256 expiryTime;
        address destination;
        address transaction;
        bool isProcessed;
    }

    address immutable factoryAddr;
    mapping(address => bool) isOwner; // Perhaps could be immutable
    uint256 public numOwners; // also?
    uint256 public transactionCount;
    string public safeName;
    mapping(uint256 => Transaction) public transactions;

    modifier onlyFactory() {
        require(
            msg.sender == factoryAddr,
            "You must use the factory interface."
        );
        _;
    }

    modifier onlyOwner(address owner) {
        require(isOwner[owner], "You are not the owner of this wallet.");
        _;
    }

    modifier transactionExists(uint256 id) {
        require(transactions[id].exists, "The transaction does not exist.");
        _;
    }

    modifier transactionNotProcessed(uint256 id) {
        require(
            !transactions[id].isProcessed,
            "The transaction has already been processed."
        );
        _;
    }

    constructor(string memory _safeName, address[] memory _owners) {
        require(_owners.length > 0, "The wallet must have at least one owner.");
        // You should only interact with this contract from the factory
        // that created it
        factoryAddr = msg.sender;
        safeName = _safeName;
        numOwners = _owners.length;
        for (uint256 i = 0; i < _owners.length; ++i) {
            isOwner[_owners[i]] = true;
        }

        // expiryDuration = block.timestamp + _duration;
    }

    function voteTransaction(
        address origin,
        uint256 _id,
        bool _approve
    )
        public
        onlyFactory
        onlyOwner(origin)
        transactionExists(_id)
        transactionNotProcessed(_id)
    {
        require(
            block.timestamp <= transactions[_id].expiryTime,
            "This transaction has expired."
        );
        // Add the below require if it is deemed unsuitable for people to change their vote on a transaction
        // require(!transactions[_id].hasVoted[origin], "You have already voted for this transaction.");

        if (!transactions[_id].hasVoted[origin]) {
            transactions[_id].hasVoted[origin] = true;
            ++transactions[_id].totalVotes;
        }

        if (!transactions[_id].voteType[origin] && _approve) {
            ++transactions[_id].forVotes;
        } else if (transactions[_id].voteType[origin] && !_approve) {
            --transactions[_id].forVotes;
        } // else the vote was the same as before so no change needed

        transactions[_id].voteType[origin] = _approve;
    }

    function addTransaction(
        address origin,
        address _destination,
        uint256 _amount,
        uint256 _duration,
        uint256 _minVotes
    ) public onlyFactory onlyOwner(origin) {
        require(_amount > 0, "Transaction must be a positive amount.");
        Transaction storage t = transactions[transactionCount];
        t.exists = true;
        t.amount = _amount;
        t.minVotes = _minVotes;
        t.expiryTime = block.timestamp + (_duration * 1 seconds);
        t.destination = _destination;
        t.isProcessed = false;
        transactionCount += 1;
    }

    function executeTransaction(address origin, uint256 _id)
        public
        payable
        onlyFactory
        onlyOwner(origin)
        transactionExists(_id)
        transactionNotProcessed(_id)
    {
        require(
            transactions[_id].forVotes >= transactions[_id].minVotes,
            "Number of votes has not been reached."
        );
        (bool sucessfulTransaction, ) = transactions[_id].destination.call{
            value: transactions[_id].amount
        }("");

        require(sucessfulTransaction, "Transaction was unsuccessful"); // Not sure if necessary

        transactions[_id].isProcessed = true;
    }

    // Allows the contract to receive eth
    receive() external payable {}

    fallback() external payable {}
}
