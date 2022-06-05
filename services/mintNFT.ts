import { Web3Provider } from '@ethersproject/providers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ethers } from 'ethers'
import web3 from 'web3'

// @ts-ignore
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export async function uploadImageToIPFS(file: any): Promise<string> {

    const added = await client.add(file, {
        progress: (prog: any) => console.log(`received: ${prog}`),
    });
    return `https://ipfs.infura.io/ipfs/${added.path}`;
}

export async function mintNFT(address: string, provider: Web3Provider, name: string, description: string, fileUrl: string): Promise<string| undefined>  {

    if (!name || !description || !fileUrl) {
        console.error('Error: missing data: ', name, description, fileUrl);
        return;
    }

    try {
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name,
            description,
            image: fileUrl,
        });
        const added = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        // todo: remove dev mode
        // const url = "https://ipfs.infura.io/ipfs/QmURfH4SppoP4ypXYgCnUJkuneaRNjRYcJxQG4eEKsrq3W";
        /* after file is uploaded to nftStorage, pass the URL to save it on blockchain */
        createProtonForSale(url, address, provider);
    } catch (error) {
        console.log(`Error uploading file: ${error}`);
    }
}

async function createProtonForSale(url: string, address: string, provider: Web3Provider) {
    // const signer = provider.getSigner();
    // debugger;

    /* next, create the item */
    // const protonContract = new ethers.Contract(ProtonB.address, ProtonB.abi, signer);
    
//    console.log("protonContract: ", protonContract);
    // let transaction = await protonContract['createProtonForSale(address,address,string,uint256,uint256,uint256)'](
    //     address,
    //     address,
    //     url,
    //     600,
    //     300,
    //     web3.utils.toWei(price)
    // );

    //     0	creator	address	0x7b86F576669f8d20a8244dABEFc65b31d7dEB3f2
        // 1	receiver	address	0x7b86F576669f8d20a8244dABEFc65b31d7dEB3f2
        // 2	tokenMetaUri	string	https://ipfs.infura.io/ipfs/QmYEe8aSWotr8TVk6XLE7nXH1rzDLRA2uGFKqCLZusZQZ8
        // 3	annuityPercent	uint256	600
        // 4	royaltiesPercent	uint256	300
        // 5	salePrice	uint256	0
    // const tx = await transaction.wait();
    // console.log("tx:", tx);
    // if (tx.events.length < 1) {
    //     console.error('tx has no events. tx: ', tx);
    //     return;
    // }
    // console.log('create post 2');
    // const event = tx.events[0];
    // const value = event.args[2];
    // const tokenId = value.toNumber();
    // console.log('token id: ', tokenId);
}