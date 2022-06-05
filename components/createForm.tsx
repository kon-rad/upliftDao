import { useState } from 'react';
import {
    Input,
    Flex,
    Textarea,
    Center,
    Box,
    Image,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { uploadImageToIPFS, mintNFT } from '../services/mintNFT';

type Props = {
};

const CreateForm = (props: Props) => {
    const fileUrl = "https://ipfs.infura.io/ipfs/QmcSPtiT3vVQ7mgL1iWcnK3kcwjMmvxHec2qKxJXRvdyzE";
    const description = "Uplift DAO member NFT grants access to protocol";
    const name = "Uplift DAO member";
    const price = "0.001";
    const web3 = useWeb3React()

    const handleSubmit = () => {

        if (web3.account && web3.library && description && fileUrl && price) {
            mintNFT(web3.account, web3.library, name, description, fileUrl, price);
        } else {
            console.error('Error: could not make post', web3.account, web3.library, description, fileUrl, price)
        }
    };

    async function handleImageUpload(e: any) {
        if (
            !e ||
            !e.target ||
            !e.target.files ||
            !e.target.files[0]
        ) {
            // setFileUrl(null);
            return;
        }
        const file = e.target.files[0];
        try {
            const url = await uploadImageToIPFS(file);
            // setFileUrl(url);
            // setFileUrl(
            //     'https://ipfs.infura.io/ipfs/QmSKCYdovA7z7RGi7XGNwLouLEnMkBmQzb7GEUgYs8fPc1',
            // );
        } catch (error) {
            console.log(`Error uploading file: ${error}`);
        }
    }
    const renderImage = () => {
        if (fileUrl) {
            return (
                <Image
                    src={fileUrl}
                    boxSize="350px"
                    objectFit="cover"
                />
            );
        }
        return '';
    };
    return (
        <>
            <Center>
                <Box
                    borderColor="brand.300"
                    bg={'brand.600'}
                    width="460px"
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    <Flex direction="column">
                        <Box
                            borderColor="gray.400"
                            mb={4}
                            h="300px"
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                        >
                            {renderImage()}
                        </Box>

                        <button  onClick={handleSubmit} className="p-2 mr-4 text-xs font-bold text-right uppercase bg-android-green border-4 border-black pxl-lg">
                            MINT
                        </button>
                    </Flex>
                </Box>
            </Center>
        </>
    );
};

export default CreateForm;
