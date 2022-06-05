//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface ICohort {
    function join(address _subject) external;
    function leave(address _subject) external;
    function setMeetingDayAndTime(string memory _sessionDayAndTime) external;
    function getMembers() external view returns (address[] memory);
    function createSession(string memory _date) external;
    function attestSession(uint256 _id, string memory _reflection) external;
}