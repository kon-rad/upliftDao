//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract UpliftNFT is ERC721URIStorage {

    uint256 public tokenId;
    string public baseTokenURI;
    uint256 public maxTokenIds = 10000;
    address public upliftDAO;

    constructor(string memory _baseURI) ERC721("Uplift DAO", "UPD") {
        baseTokenURI = _baseURI;
        upliftDAO = msg.sender;
        tokenId = 0;
    }

    function mint() public payable {
        require(tokenId < maxTokenIds, "Exceeded max supply");
        _safeMint(msg.sender, tokenId);
        tokenId++;
    }

    receive() external payable {}
    fallback() external payable {}
}