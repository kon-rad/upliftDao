//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./tokens/UpliftNFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract UpliftDAO {

    address public nftAddress;
    address[] public cohortsArr;
    mapping(address => uint256) cohortStatus;

    constructor(string memory baseURI) {
        nftAddress = new UpliftNFT(baseURI);
    }

    modifier memberOnly() {
        require(IERC721(nftAddress).balanceOf(msg.sender) > 0, "only for members");
        _;
    }

    function createCohort(string calldata mission) public memberOnly {
        address memory cohort = New Cohort(mission);
    }


}