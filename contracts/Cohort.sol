//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./interfaces/IUpliftDAO.sol";

contract Cohort {

    uint256 public id;
    uint256 public sessionCount = 0;
    string public name;
    address public dao;
    string public sessionDayAndTime;
    address[] public members;
    mapping(address => uint256) memberJoinDate;
    Session[] sessions;
    mapping(uint256 => address[]) sessionToAttestations;

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

    constructor(uint256 _id, string memory _name) {
        id = _id;
        name = _name;
        dao = msg.sender;
    }

    modifier onlyDAO() {
        require(msg.sender == dao, "only for Dao");
        _;
    }
    modifier onlyMember() {
        require(memberJoinDate[msg.sender] != 0, "only for cohort members");
        _;
    }

    function join(address _subject) external onlyDAO {
        require(members.length <= 7, "cohort is full");
        members.push(_subject);
        memberJoinDate[_subject] = block.timestamp;
    }

    function leave(address _subject) external onlyDAO {
        require(memberJoinDate[_subject] != 0, "is not a member");
        require(memberJoinDate[_subject] + 90 days < block.timestamp, "00 days minimum");
        delete memberJoinDate[_subject];
        uint256 i = 0;
        uint256 membersLen = members.length;
        for (i; i < membersLen; i++) {
            if (members[i] == _subject) {
                delete members[i];
                if (i != membersLen - 1) {
                    members[i] = members[membersLen - 1];
                }
                break;
            }
        }
    }

    function setMeetingDayAndTime(string memory _sessionDayAndTime) external onlyMember {
        sessionDayAndTime = _sessionDayAndTime;
    }

    function getMembers() external view returns (address[] memory) {
        return members;
    }

    function createSession(string memory _date) external onlyMember {
        sessions.push(Session({
            id: sessionCount,
            date: _date,
            status: Status.Open,
            reflection: "",
            membersCount: members.length
        }));
        address[] memory attestations;
        sessionToAttestations[sessionCount] = attestations;
        sessionCount++;
    }

    function attestSession(uint256 _id, string memory _reflection) external onlyMember {
        require(sessions[_id].status == Status.Open, "session is not open");
        // todo: check if user has already attested
        sessionToAttestations[_id].push(msg.sender);
        if (sessionToAttestations[_id].length == members.length) {
            sessions[_id].status = Status.Completed;
            // todo: find another way to set reflection than last person to attest
            sessions[_id].reflection = _reflection;
            IUpliftDAO(dao).rewardCohort();
        }
    }
}