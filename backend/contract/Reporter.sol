// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct Reporter {
    //Declaring different structure elements
    string name;
    string email;
    string org;
    uint256 tokenId;
    string publicKey;
}

contract ReporterOperator {
    mapping(address => Reporter) reporterAccounts;
    Reporter[] public reporterAccountList;

    function add(
        address _address,
        string memory _name,
        string memory _email,
        string memory _org,
        string memory _publicKey,
        uint256 _id
    ) public {
        Reporter memory curr = Reporter(_name, _email, _org, _id, _publicKey);
        reporterAccounts[_address] = curr;
        reporterAccountList.push(curr);
    }

    function getReporterInfoWithAddress(address _address) public view returns (Reporter memory) {
        return reporterAccounts[_address];
    }

    function getReporterAccounts() public view returns (Reporter[] memory) {
        return reporterAccountList;
    }

    function isOptedIn(address _address) public view returns (bool) {
        return bytes(reporterAccounts[_address].name).length != 0;
    }

    function setReporterInfo(
        address _address,
        string memory _newName,
        string memory _newEmail
    ) public {
        Reporter memory reporter = reporterAccounts[_address];
        if (bytes(_newName).length != 0) {
            reporter.name = _newName;
        }
        if (bytes(_newEmail).length != 0) {
            reporter.email = _newEmail;
        }
        reporterAccounts[_address] = reporter;
    }
}
