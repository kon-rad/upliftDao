//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./tokens/UpliftNFT.sol";
import "./Cohort.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract UpliftDAO {

    address public nftAddress;
    address[] public cohortsArr;
    mapping(address => uint256) public cohortStatus;
    uint256 public cohortsCount;
    mapping(address => uint256) public cohortMembers;
    address[] public cohortMemebrsArr;
    mapping(uint256 => address) public cohortIdToAddress;

    constructor(string memory baseURI) {
        nftAddress = new UpliftNFT(baseURI);
        cohortsCount = 0;
    }

    modifier memberOnly() {
        require(IERC721(nftAddress).balanceOf(msg.sender) > 0, "only for members");
        _;
    }

    function createCohort(string calldata name, string calldata mission) public memberOnly {
        require(cohortMembers[msg.sender].length == 0, "already a member");
        address cohortAddr = new Cohort(cohortsCount, cohortId, name, mission, msg.sender);
        cohortIdToMembers[cohortsCount] = [cohortAddr];
        cohortsCount++;
    }

    function joinCohort(uint256 _cohortId) public memberOnly {
        require(cohortMembers[msg.sender].length == 0, "already a member");
        ICohort(cohortIdToAddress[_cohortId]).join(msg.sender);
    }

    function leaveCohort(uint256 _cohortId) public memberOnly {
        require(cohortMembers[msg.sender].length > 0, "not a cohort member");
        ICohort(cohortIdToAddress[_cohortId]).leave(msg.sender);
    }
}