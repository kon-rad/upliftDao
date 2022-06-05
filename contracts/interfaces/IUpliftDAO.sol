//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IUpliftDAO {
    function createCohort(string calldata name, string calldata mission) external;
    function joinCohort(uint256 _cohortId) external;
    function leaveCohort(uint256 _cohortId) external;
    function rewardCohort() external;
}