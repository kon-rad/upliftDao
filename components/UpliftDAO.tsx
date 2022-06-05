import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { Box, Flex, Image, Text, Input, Button, useMediaQuery } from "@chakra-ui/react";
import Web3Modal from "web3modal";
import { toast } from "react-toastify";

import UpliftDAOArtifact from '../artifacts/contracts/UpliftDAO.sol/UpliftDAO.json';
import CohortArtifact from '../artifacts/contracts/Cohort.sol/Cohort.json';

const UPLIFTDAO_ADDRESS = process.env.NEXT_PUBLIC_UPLIFTDAO_ADDRESS || "";

const UpliftDAO = () => {
    const [cohorts, setCohorts] = useState<any>([]);
    const [name, setName] = useState<string>("");
    const [loadingState, setLoadingState] = useState('not-loaded');
    useEffect(() => {
      loadCohorts();
    }, []);


  async function loadCohorts() {
      
    const provider = ethers.getDefaultProvider('http://localhost:8545');
    const upliftContract = new ethers.Contract(UPLIFTDAO_ADDRESS, UpliftDAOArtifact.abi, provider);
    
    const data = await upliftContract.getCohorts();
    console.log('data: ', data);
    // const cohortContract = new ethers.Contract(UPLIFTDAO_ADDRESS, UpliftDAOArtifact.abi, provider);
    const getCohort = async (i: any) => {
        console.log('item: ', i);

        const cohortContract = new ethers.Contract(i, CohortArtifact.abi, provider);

        const name = await cohortContract.name();
        const members = await cohortContract.getMembers();
        const sessionDayAndTime = await cohortContract.sessionDayAndTime();
        const item = {
            name,
            members,
            sessionDayAndTime,
        };
        console.log('cohort data: ', item);
        
        return item;
      };

    const cohortData = await Promise.all((data || []).map(getCohort));
    setCohorts(cohortData);
    console.log('done loading');
  }
  async function joinCohort(id: number, name: string) {
      
    const provider = ethers.getDefaultProvider('http://localhost:8545');
    const signer = provider.getSigner();
    const upliftContract = new ethers.Contract(UPLIFTDAO_ADDRESS, UpliftDAOArtifact.abi, signer);
    
    const data = await upliftContract.joinCohort(id);
    console.log('data: ', data);
    toast(`You successfully joined cohort ${name}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const handleSubmit = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_UPLIFTDAO_ADDRESS || "",
      UpliftDAOArtifact.abi,
      signer
    );
    // const sendValue = web3.utils.toWei('10', 'ether');
    const transaction = await contract.createCohort(
      name
    );
    await transaction.wait();
    toast(`You successfully created ${name}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

    const renderMembers = (arr: any) => {
        if (!arr) return "";
        return (
            <div className="my-4 flex items-center flex-col">
                {arr.map((member: string, i: number) => (
                    <p className="my-2 text-uppercase text-center font-bold ">member #{i}: {member}</p>
                ))}
            </div>
        )
    }
    return (
        <div className="flex align-center justify-center flex-col items-center">
            <h1 className="text-3xl font-bold text-center underline my-4 w-1/3">
                Mission: to uplift each other
            </h1>

            <div  className="w-1/3 p-2 mr-4 text-xs font-bold text-center uppercase bg-android-green border-4 border-black pxl-lg">
                <h3 className="my-4 font-bold text-center uppercase ">how it works</h3>
                <p className="my-2">
                    1. Join DAO by minting NFT
                </p>
                <p className="my-2">
                    2. Join or create a cohort
                </p>
                <p className="my-2">
                    3. Attend bi-weekly sessions where everyone answer 3 quesitons: what you did, what you will do, what obstacles you face.
                </p>
                <p className="my-2">
                    4. Uplift others, take care of your mental health and earn Uplift Tokens
                </p>
            </div>

            <div  className="w-1/3 p-2 mr-4 my-10 text-xs font-bold text-center uppercase bg-android-green border-4 border-black pxl-lg">
                <h3 className="my-4 font-bold text-center uppercase ">create a chort</h3>
                <Flex p="2">
                    <Input
                        my="2"
                        mr="2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        name={"name"}
                        placeholder={"cohort name"}
                    />
                    <Box my="2">

                        <button  onClick={handleSubmit} className="p-2 mr-4 text-xs font-bold text-right uppercase bg-android-green border-4 border-black pxl-lg">
                            Submit
                        </button>
                    </Box>
                </Flex>
            </div>
            {cohorts.map((data: any, i: number) => (
                <div  className="w-1/3 p-2 mr-4 my-10 text-xs font-bold text-center uppercase bg-android-green border-4 border-black pxl-lg">
                <h3 className="my-4 font-bold text-center uppercase ">{ data.name }</h3>
                <p className="my-2 font-bold text-center ">session day and time: {data.sessionDayAndTime}</p>
                <p className="my-2 font-bold text-center ">session members: {renderMembers(data.members)}</p>

                <button  onClick={() => joinCohort(i, data.name)} className="p-2 mr-4 text-xs font-bold text-right uppercase bg-android-green border-4 border-black pxl-lg">
                    join
                </button>
            </div>
            ))}
        </div>
    )
}

export default UpliftDAO;