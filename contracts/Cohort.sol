//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Cohort {

    uint256 public id;
    string public name;
    string public mission;

    constructor(uint256 _id, string memory _name, string memory _mission) {
        id = _id;
        name = _name;
        mission = _mission;
    }
}