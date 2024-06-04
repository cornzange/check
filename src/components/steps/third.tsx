import { Address, Cell, beginCell, storeStateInit, toNano } from "@ton/core";
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { CHECK_BASE_64 } from "../constatnts";
import { createStateInit, getPasswordHash, passwordToCell } from "../utils";
import { getJettonWalletAddress } from "../api";

type Props = {
    jettonWalletAddress: string
    setJettonWalletAddress: (newValue: string) => void
    jettonsAmount: string
    setJettonsAmount: (newValue: string) => void
    destinationAddress: string
    setDestinationAddress: (newValue: string) => void
}
function Receiver() {
    const [tonConnectUI, setOptions] = useTonConnectUI();

    const [jettonWalletAddress, setJettonWalletAddress] = useState('');
    const [jettonsAmount, setJettonsAmount] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [jettonMinterAddress, setJettonMinterAddress] = useState('');
    const [password, setPassword] = useState('');
    const [checkAddress, setCheckAddress] = useState('');
    const createPayload = (password: Cell, jettonWalletAddress: Address, jettonsAmount: bigint, ownerAddress: Address) => {
        const opCode = 1;
        const queryId = 1;
        const payload: Cell = beginCell()
            .storeUint(opCode, 32)
            .storeUint(queryId, 64)
            .storeRef(password)
            .storeAddress(jettonWalletAddress)
            .storeCoins(jettonsAmount)
            .storeAddress(ownerAddress)
            .storeAddress(ownerAddress)
            .storeCoins(0)
            .endCell()
        return payload.toBoc().toString('base64')
    }

    const createMSG = async () => {
        const toAddress = (address: string) => Address.parseFriendly(address).address
        const minterAddress: Address = toAddress(jettonMinterAddress)
        const check: Address = toAddress(checkAddress)
        const destination: Address = toAddress(destinationAddress)
        const jettonsToTransfer = toNano(jettonsAmount)
        const walletAddress: Address = await getJettonWalletAddress(minterAddress, check)
        const code: Cell = Cell.fromBase64(CHECK_BASE_64)
        const data: Cell = beginCell()
            .storeAddress(minterAddress)
            .storeUint(getPasswordHash(password), 256)
            .endCell()

        const stateInit: string = createStateInit(code, data);
        return {
            address: check.toString(),
            amount: '50000000',
            stateInit,
            payload: createPayload(passwordToCell(password), walletAddress, jettonsToTransfer, destination)
        }
    }
    const transferJettons = async () => {
        const msg = await createMSG();
        const secondsInMinute = 60;
        const minutes = 10
        const waitingTime = minutes * secondsInMinute;
        const transaction: SendTransactionRequest = { validUntil: Math.floor(Date.now() / 1000) + waitingTime, messages: [msg] }
        await tonConnectUI.sendTransaction(transaction);
    }

    return (
        <div>
            <div className="field_container">
                <p className="field_name">jetton minter address:</p><input className="field_input" type="text" onBlur={(e) => setJettonMinterAddress(e.target.value)}></input>
            </div>
            <div className="field_container">
                <p className="field_name">password:</p><input className="field_input" type="text" onBlur={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="field_container">
                <p className="field_name">check address:</p><input className="field_input" type="text" onBlur={(e) => setCheckAddress(e.target.value)}></input>
            </div>
            <div className="field_container">
                <p className="field_name">jettons amount:</p><input className="field_input" type="number" onBlur={(e) => setJettonsAmount(e.target.value)}></input>
            </div>
            <div className="field_container">
                <p className="field_name">destination address:</p><input className="field_input" type="text" onBlur={(e) => setDestinationAddress(e.target.value)}></input>
            </div>
            <div className="field_container">
                <button onClick={transferJettons}>transfet jettons</button>
            </div>
        </div>


    )
}

export default Receiver