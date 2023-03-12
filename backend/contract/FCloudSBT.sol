// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Reporter.sol";

contract FcloudSBT is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    ReporterOperator public reporterOperator;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(address _reporterContract) ERC721("FCloud SBT", "FSBT") {
        reporterOperator = ReporterOperator(_reporterContract);
    }

    function safeMint(
        address _to,
        string memory _name,
        string memory _email,
        string memory _org
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        reporterOperator.add(_to, _name, _email, _org, tokenId);
        _safeMint(_to, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        require(from == address(0), "Token is not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
