import { atom } from 'recoil'
import { IAdmin } from '../utils/types/IAdmin';

export interface IPaypoint {
    _id?: string,
    bank?: {
      bank_name: string,
      account_name: string,
      account_number: number,
      bank_code: string
    },
    rate?: number,
    etheruem_wallet?: string,
    usdt_wallet?: string,
    bitcoin_wallet?: string,
}

let User: IPaypoint = {};

export const PaypointState = atom<IPaypoint>({
    key: 'paypoint',
    default: User,
});