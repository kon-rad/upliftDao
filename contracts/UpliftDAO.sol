//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./tokens/UpliftNFT.sol";
import "./Cohort.sol";
import "./tokens/UpliftToken.sol";
import "./interfaces/ICohort.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UpliftDAO {

    address public upliftToken;

    address public nftAddress;
    address[] public cohortsArr;
    mapping(address => uint256) public cohortStatus;
    uint256 public cohortsCount;
    mapping(address => uint256) public cohortMembers;
    address[] public cohortMemebrsArr;
    mapping(uint256 => address) public cohortIdToAddress;

    constructor(string memory baseURI) {
        nftAddress = address(new UpliftNFT(baseURI));
        cohortsCount = 0;
        upliftToken = address(new UpliftToken());
    }

    modifier memberOnly() {
        require(IERC721(nftAddress).balanceOf(msg.sender) > 0, "only for members");
        _;
    }

    function createCohort(string calldata _name) external memberOnly {
        require(cohortMembers[msg.sender] == 0, "already a member");
        address cohortAddr = address(new Cohort(cohortsCount, _name));
        cohortsCount++;
    }

    function joinCohort(uint256 _cohortId) external memberOnly {
        require(cohortMembers[msg.sender] == 0, "already a member");
        ICohort(cohortIdToAddress[_cohortId]).join(address(msg.sender));
    }

    function leaveCohort(uint256 _cohortId) external memberOnly {
        require(cohortMembers[msg.sender] > 0, "not a cohort member");
        ICohort(cohortIdToAddress[_cohortId]).leave(address(msg.sender));
    }

    function rewardCohort() external {
        require(cohortStatus[msg.sender] != 0, "only for cohort");
        address[] memory cohortMembers = ICohort(msg.sender).getMembers();
        uint256 i = 0;
        uint256 len = cohortMembers.length;
        for (i; i < len; i++) {
            IERC20(upliftToken).transfer(cohortMembers[i], 10);
        }
    }

    receive() external payable {}
    fallback() external payable {}
}