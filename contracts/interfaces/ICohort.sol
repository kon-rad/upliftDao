//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

enum Status {
    Open,
    Completed,
    Incomplete
}

struct Session {
    uint256 id;
    string date;
    Status status;
    string reflection;
    uint256 membersCount;
}

interface ICohort {
    function join(address _subject) external;
    function leave(address _subject) external;
    function setMeetingDayAndTime(string memory _sessionDayAndTime) external;
    function getMembers() external view returns (address[] memory);
    function createSession(string memory _date) external;
    function attestSession(uint256 _id, string memory _reflection) external;
    function getSessions() external view returns (Session[] memory);
}