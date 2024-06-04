import { Address, beginCell } from "@ton/core";
import { useState } from "react";
import { CHECK_BASE_64 } from "../constatnts";
import { getCheckAddress } from "../api";
import { getPasswordHash } from "../utils";

export type CheckConfig = {
    jettonMasterAddress: Address,
    password: number
};

function Sender() {
    const [jettonMinterAddress, setJettonMinterAddress] = useState('');
    const [password, setPassword] = useState('');
    const [checkAddress, setCheckAddress] = useState('');
    const calculateCheckAddress = async () => {
        const passwordHash: string = beginCell().storeUint(getPasswordHash(password), 256).endCell().toBoc().toString("base64");
        const jettonMinter: Address = Address.parseFriendly(jettonMinterAddress).address;
        setCheckAddress(await getCheckAddress(jettonMinter, passwordHash, CHECK_BASE_64))
    }
    return (
        <div>
            <div className="field_container">
                <p className="field_name">jetton minter address:</p><input className="field_input" type="text" onChange={(e) => setJettonMinterAddress(e.target.value)} value={jettonMinterAddress}></input>
            </div>
            <div className="field_container">
                <p className="field_name">password:</p><input className="field_input" type="number" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            </div>
            <div className="field_container">
                <button className="field_button" onClick={calculateCheckAddress}>calculate check address</button>
            </div>

            <p className="field_result">result: {checkAddress}</p>
        </div>


    )
}

export default Sender