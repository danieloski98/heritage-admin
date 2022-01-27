import { IUser } from "./IUser";

export enum COINTYPE {
    BTC = 1,
    ETH,
    USDT,
}

export enum STATUS {
    PROCESSING = 1,
    APPREOVED,
    DELCINED
}

export interface ITransaction {
  _id: string;

  user: IUser;

  user_id: string;

  amount: number;

  coin_amount: number;

  proof_of_payment: string[];

  admin_proof_of_payment: string;

  type: number;

  coin_type: COINTYPE;

  status: STATUS;

  createdAt: string;

  updatedAt: string;
}

