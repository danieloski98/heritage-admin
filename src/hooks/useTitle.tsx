import React from 'react'
// recoil
import { useRecoilState } from 'recoil'
import { TitleState } from '../state/title'

export default function useTitle() {
    const [title, setT] = useRecoilState(TitleState);
    const setTitle = (t: 'Admin Dashboard'|'User Management'|'Transaction History'|'Pending Transactions'|'User Profile'|'Admin Management') => {
        t.toUpperCase();
        setT(t)
    }

    return {
        title,
        setTitle,
    }
}
