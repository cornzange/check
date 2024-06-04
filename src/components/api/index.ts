import { HttpClient, Api } from 'tonapi-sdk-js';
import { CHECK_CONTRACT_ADDRESS, TON_API_TOKEN } from '../constatnts';
import { Address, Cell } from '@ton/core';
import { Buffer } from 'buffer';

const httpClient = new HttpClient({
    baseUrl: 'https://tonapi.io', // TODO maybe add testnet
    baseApiParams: {
        headers: {
            Authorization: `Bearer ${TON_API_TOKEN}`,
            'Content-type': 'application/json'
        }
    }
});
const client = new Api(httpClient);


export const getCheckAddress = async (jettonMinterAddress: Address, passwordHash: string, checkCode: string) => {
    const addressToRaw = (address: string) => Address.parseFriendly(address).address.toRawString();
    const res = await client.blockchain.execGetMethodForBlockchainAccount(
        addressToRaw(CHECK_CONTRACT_ADDRESS),
        "get_check_address",
        { args: [checkCode, passwordHash, jettonMinterAddress.toRawString()] }
    );
    const readAddress = (cell: string) => Cell.fromBoc(Buffer.from(cell, 'hex'))[0].beginParse().loadAddress()
    const checkAddress: Address = readAddress(res.stack[0].cell as string)
    return checkAddress.toString()
}

export const getJettonWalletAddress = async (jettonMinterAddress: Address, ownerAddress: Address) => {
    const res = await client.blockchain.execGetMethodForBlockchainAccount(
        jettonMinterAddress.toRawString(),
        "get_wallet_address",
        { args: [ownerAddress.toRawString()] }
    );
    const readAddress = (cell: string) => Cell.fromBoc(Buffer.from(cell, 'hex'))[0].beginParse().loadAddress()
    const result = readAddress(res.stack[0].cell as string)
    console.log(result)
    return result
}