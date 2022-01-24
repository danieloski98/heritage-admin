import { atom } from 'recoil'
import { IAdmin } from '../utils/types/IAdmin';

let User: IAdmin = {};

export const UserState = atom<IAdmin>({
    key: 'admin',
    default: User,
});