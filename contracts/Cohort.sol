//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Cohort {

    uint256 public id;
    string public name;
    string public mission;
    address public dao;
    address[] public members;
    mapping(address => uint256) memberJoinDate;

    enum Status {
        Open,
        Completed,
        Incomplete
    }

    struct Session {
        string date;
        Status status;
        string reflection;
        address[] attestations;
    }

    constructor(uint256 _id, string memory _name, string memory _mission) {
        id = _id;
        name = _name;
        mission = _mission;
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

    function join() public onlyDAO {
        require(members.length <= 7, "cohort is full");
        members.push(msg.sender);
        memberJoinDate[msg.sender] = block.timestamp;
    }

    function leave(address _subject) public onlyDAO {
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

    // set meeting day
    // set cohort join date per member
    // create meeting statement
    // get reward for meeting with all members

    function getMembers() public view returns (address[] memory) {
        return members;
    }

    function createSession() public onlyMember {

    }
}