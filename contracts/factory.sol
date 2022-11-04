pragma solidity ^0.8.17;

import "./multisigwallet.sol";

contract Factory {
    mapping(address => address[]) safes;

    function createNewSafe(
        string memory _safeName,
        uint256 _minVotes,
        address[] memory _owners
    ) public {
        MultiSigWallet safe = new MultiSigWallet(_safeName, _minVotes, _owners);
        for (uint256 i = 0; i < _owners.length; ++i) {
            safes[_owners[i]].push(address(safe));
        }
    }

    // Explicitly make a getter method so users can only access the safes they
    // own.
    function GetSafes() public view returns (address[] memory) {
        return safes[msg.sender];
    }
}
