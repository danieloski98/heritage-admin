import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useQuery } from 'react-query'
import {useRecoilState} from 'recoil'
import {TokenState} from '../../../state/token';
import {PendingState} from '../../../state/pending'
import { url } from '../../../utils/url'
import { IServerReturnType } from '../../../utils/types/ServerReturnType'
import { ITransaction } from '../../../utils/types/Transaction'

// get transactions
const getTransactions = async (token: string) => {
    const request = await fetch(`${url}transaction?pending=${true}`, {
        method: 'get',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const json = await request.json() as IServerReturnType;
    if (!request.ok) {
        throw new Error('An error occured while fetching transactions');
    }
    return json;
}


export default function Index() {
    const [pending, setPending] = useRecoilState(PendingState);
    const [token, _] = useRecoilState(TokenState);

    const transactionsQuery = useQuery(['getPending', token], () => getTransactions(token), {
        onSuccess: (data) => {
            const buyT = (data.data as ITransaction[]).filter((item, index) => item.type === 1);
            const sellT = (data.data as ITransaction[]).filter((item, index) => item.type === 2);
            // setBuy(buyT);
            // setSell(sellT);
            // console.log(sellT);
            // setTransloading(false);
            // setTranserror(false);
            setPending(buyT.length + sellT.length);
        },
        onError: (error) => {
            // setTranserror(true);
            // setTransloading(false);
        }
    })
    return (
        <div className='flex w-full h-screen overflow-hidden'>
           <div className="w-64 h-full bg-black">
               <Sidebar />
           </div>
           <div className="flex-1 flex flex-col">
               <Navbar />
               <div className="flex-1 bg-gray-200 pt-10 pl-10 pr-10 pb-6 overflow-y-auto">
                   <Outlet />
               </div>
           </div>
        </div>
    )
}
