import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import {
    List,
    ListItem,
    ListIcon,
    Flex,
    VStack,
    Button,
    Box,
    Text,
    Image
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { mintNFT } from '../services/mintNFT';
import { CheckCircleIcon } from '@chakra-ui/icons';

const Mint = () => {
    const web3 = useWeb3React();

    const handleSubmit = (
        description: string,
        fileUrl: string,
        price: string,
    ) => {
        console.log('submit');
        if (
            web3.account &&
            web3.library &&
            description &&
            fileUrl &&
            price
        ) {
            mintNFT(
                web3.account,
                web3.library,
                description,
                fileUrl,
                price,
            );
        } else {
            console.error(
                'Error: could not make post',
                web3.account,
                web3.library,
                description,
                fileUrl,
                price,
            );
        }
    };

    return (
        <>
            <VStack p={5} mb={12}>
                <Box textAlign="center" mb={24}>
                    <Text fontSize="3xl" mb={12}>
                        Mint a UpliftDAO Member NFT
                    </Text>
                    <Text fontSize="xl" mb={12}>
                        Get access to participate in cohorts
                    </Text>
                </Box>
                <Image borderRadius="xl" src="/images/2.png" height="300px" m={4}/>
                <Box mb={12}>
                    <Button>Mint</Button>
                </Box>
            </VStack>
        </>
    );
};

export default Mint;
