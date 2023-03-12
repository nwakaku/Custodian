// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct Report {
    string cid;
    string title;
    address owner;
}

contract ReportManagement {
    mapping(address => int[]) recToReport;
    Report[] reportList;

    event NewReport(string cid, string title, address owner);

    function add(string memory _cid, string memory _title, address _owner, address[] memory recs) public {
        Report memory curr = Report(_cid, _title, _owner);
        for (uint256 i = 0; i < recs.length; i++) {
            recToReport[recs[i]].push(int(reportList.length));
        }
        reportList.push(curr);
        emit NewReport(_cid, _title, _owner);
    }

    function getRecToReport(address _address) public view returns (Report[] memory) {
        int[] memory index = recToReport[_address];
        Report[] memory reports = new Report[](index.length);
        for (uint256 i = 0; i < index.length; i++) {
            reports[i] = reportList[uint256(index[i])];
        }
        return reports;
    }
}
