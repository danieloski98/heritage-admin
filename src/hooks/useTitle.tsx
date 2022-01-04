import React from 'react'
// recoil
import { useRecoilState } from 'recoil'
import { TitleState } from '../state/title'

export default function useTitle() {
    const [title, setT] = useRecoilState(TitleState);
    const setTitle = (t: 'Admin Dashboard'|'User Management'|'Transaction History'|'Pending Transactions') => {
        t.toUpperCase();
        setT(t)
    }

    return {
        title,
        setTitle,
    }
}
