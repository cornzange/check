import { Address, Cell, beginCell } from "@ton/core";
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";

function Second({ jettonMinterAddress, checkAddress }: { jettonMinterAddress: string, checkAddress: string }) {
    const [tonConnectUI] = useTonConnectUI();
    const createPayload = (checkAddress: Address, jettonMinterAddress: Address, jettonsAmountToMint: number) => {
        const masgerMsg: Cell = beginCell()
            .storeUint(0x178d4519, 32) // op
            .storeUint(1, 64) // query_id
            .storeCoins(jettonsAmountToMint)
            .storeAddress(jettonMinterAddress)// slice from_address = in_msg_body~load_msg_addr();
            .storeAddress(checkAddress)// slice response_address = in_msg_body~load_msg_addr();
            .storeCoins(0)// int forward_ton_amount = in_msg_body~load_coins();
            .endCell()
        const payload: Cell = beginCell()
            .storeUint(0x15, 32) // op
            .storeUint(1, 64) // query_id
            .storeAddress(checkAddress)
            .storeCoins(40000000)
            .storeRef(masgerMsg)
            .endCell()
        return payload.toBoc().toString('base64')
    }
    const createMSG = (jettonMinterAddress: string, checkAddress: string) => {
        const minterAddress: Address = Address.parseFriendly(jettonMinterAddress).address
        const check: Address = Address.parseFriendly(checkAddress).address
        return {
            address: minterAddress.toString(),
            amount: '50000000',
            payload: createPayload(check, minterAddress, 1000000000)
        }
    }
    const mintJettons = async () => {
        // TODO add address calculation

        const msg = createMSG(jettonMinterAddress, checkAddress);
        const secondsInMinute = 60;
        const minutes = 10
        const waitingTime = minutes * secondsInMinute;
        const transaction: SendTransactionRequest = { validUntil: Math.floor(Date.now() / 1000) + waitingTime, messages: [msg] }
        await tonConnectUI.sendTransaction(transaction);
    }
    return (
        <div>
            <div className="field_container">
                <button onClick={mintJettons}>mint jettons</button>
            </div>
        </div>


    )
}

export default Second