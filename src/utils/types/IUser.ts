
export interface IUser {
  _id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  referral_code: string;
  password: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  mobile_id: string;
  web_id: string;
  bitcoin_wallet: string;
  ethereum_wallet: string;
  usdt_wallet: string;
  createdAt: string;
  updateAt: string;
  isLoggedIn: boolean;
  verified: boolean;
  suspended: boolean;
}
