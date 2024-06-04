import { Cell, beginCell, storeStateInit } from "@ton/core"
import { sha256_sync } from "@ton/crypto"
import { Buffer } from "buffer"

export function passwordToCell(password: string) {
    return beginCell().storeBuffer(Buffer.from(password)).endCell()
}

export function getPasswordHash(password: string) {
    return BigInt(`0x${sha256_sync(password).toString("hex")}`)
}

export const createStateInit = (code: Cell, data: Cell): string => beginCell().store(storeStateInit({ code, data })).endCell().toBoc().toString('base64')