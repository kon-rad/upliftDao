//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract UpliftNFT is ERC721URIStorage {

    uint256 public tokenId;
    string public baseTokenURI;
    uint256 public price = 0.01 ether;
    uint256 public maxTokenIds = 10000;
    address public upliftDao;

    constructor(string memory _baseURI, address _upliftDao) ERC721("Uplift DAO", "UPD") {
        baseTokenUR = _baseURI;
        upliftDao = _upliftDao;
        tokenId = 0;
    }

    function mint() public payable {
        require(tokenId < maxTokenIds, "Exceeded max supply");
        require(msg.value >= price, "Ether value not correct");
        _safeMint(msg.sender, tokenId);
        tokenId++;
        payable(address(upliftDao)).transfer(msg.value);
    }
    
    receive() external payable {}
    fallback() external payable {}
}