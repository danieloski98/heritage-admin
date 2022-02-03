import React from 'react'
import { FiArrowLeftCircle, FiMoreVertical } from 'react-icons/fi'
import { Menu, MenuButton, MenuList, MenuItem, Skeleton } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import EditModal from '../Components/users/EditModal';
import DeleteModal from '../Components/users/DeleteModal';
import { url } from '../../../utils/url';
import { IServerReturnType } from '../../../utils/types/ServerReturnType';
import { IUser } from '../../../utils/types/IUser'
import { ITransaction } from '../../../utils/types/Transaction'

const getUser = async (id: string) => {
    const request = await fetch(`${url}user/${id}`, {
        method: 'get',
    });
    const json = await request.json();
    if (!request.ok) {
        throw new Error('An error occured');
    }

    return json as IServerReturnType;
}

export default function User() {
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errorText, setErrortext] = React.useState('');
    const [user, setUser] = React.useState({} as IUser);
    const [transactions, setTransactions] = React.useState([] as Array<ITransaction>);
    const [pending, setPending] = React.useState([] as Array<ITransaction>);

    const loc = useNavigate();
    const params = useParams();
    const icon = `https://avatars.dicebear.com/api/human/${user.email}.svg`;
    // alert(JSON.stringify(params));

    const getUserDetails = useQuery(['getUser', params['id']], () => getUser(params['id'] as string), {
        onSuccess: (data) => {
            const userD = data.data.user;
            const trans = data.data.transactions as Array<ITransaction>;
            const pend = trans.filter((item) => item.status === 1);
            setPending(pend);
            console.log(data);
            setUser(userD);
            setTransactions(trans);
            setLoading(false);
            setError(false);
            setErrortext('');
        },
        onError: (error) => {
            setLoading(false);
            setError(true);
            setErrortext('An Error occured');
        },
    })

    return (
        <div className='w-full h-full flex flex-col'>

             {/* modals */}

             <EditModal open={openEditModal} close={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} close={setOpenDeleteModal} />

            <div className="flex items-center">
                <FiArrowLeftCircle color="black" className='cursor-pointer' size={30} onClick={() => loc('/dashboard/users')} />
                <p className='text-sm font-Inter_Medium ml-4'>Customer Profile</p>
            </div>

            <div className="flex-1 bg-white rounded-md mt-6 flex flex-col">
                <div className="w-full h-1/3 bg-black rounded-md p-6 flex">
                    
                    <div className="flex-1 flex">
                        <div className="w-32 h-32 rounded-md bg-gray-600">
                            <img src={icon} alt="" />
                        </div>

                        <div className="flex flex-col justify-center ml-10">
                            {
                                loading && (<Skeleton width="150px" height="100px" />)
                            }
                            {!loading && (
                                <>
                                    <p className='text-sm font-Inter_Bold text-white'>{user.first_name} {user.last_name}</p>
                                    <p className='text-xs font-Inter_Regular text-white mt-3'>{user.email} (verified)</p>
                                    <p className='text-xs font-Inter_Regular text-white mt-1'>{user.phone} (verified)</p>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col justify-center ml-20">
                            <p className='text-sm font-Inter_Bold text-white'>Role</p>
                            <p className='text-xs font-Inter_Regular text-white mt-3'>User</p>
                        </div>

                    
                    </div>

                    <div className="w-4 flex items-start h-full" >
                        <Menu size="lg">
                            <MenuButton >
                                <FiMoreVertical size={30} color="white" className='cursor-pointer' />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setOpenEditModal(true)} className='text-xs font-Inter_Regular text-black'>Edit</MenuItem>
                                <MenuItem onClick={() => setOpenDeleteModal(true)} className='text-xs font-Inter_Regular text-black'>Delete Profile</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                </div>

                <div className="flex-1 p-6 flex-col flex">

                    <div className="flex">
                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>ACCOUNT STATUS</p>
                            <Skeleton isLoaded={!loading}>
                                {user.verified ? <p className='text-xs font-Inter_Regular text-black' mt-2>Active</p> : <p className='text-xs font-Inter_Regular text-black' mt-2>Inactive</p>}
                            </Skeleton>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>SAVINGS WALLET BALANCE</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>0 USDT</p>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>TOTAL TRANSACTIONS</p>
                            <Skeleton isLoaded={!loading}>
                                <p className='text-xs font-Inter_Regular text-black' mt-2>{transactions.length}</p>
                            </Skeleton>
                            {/* <p className='text-xs font-Inter_Regular text-black' mt-2>8291</p> */}
                        </div>
                    </div>

                    <div className="flex mt-10">
                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>USDT WALLET ADDRESS</p>
                            <Skeleton isLoaded={!loading}>
                                <p className='text-xs font-Inter_Regular text-black' mt-2>{user.usdt_wallet}</p>
                            </Skeleton>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>BTC WALLET</p>
                            <Skeleton isLoaded={!loading}>
                                <p className='text-xs font-Inter_Regular text-black' mt-2>{user.bitcoin_wallet}</p>
                            </Skeleton>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>ETH WALLET</p>
                            <Skeleton isLoaded={!loading}>
                                <p className='text-xs font-Inter_Regular text-black' mt-2>{user.ethereum_wallet}</p>
                            </Skeleton>
                        </div>
                    </div>

                    <div className="flex mt-10">
                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>BANK ACCOUNT</p>
                            <Skeleton isLoaded={!loading}>
                                <p className='text-xs font-Inter_Regular text-black' mt-2>{user.account_number} {user.bank_name} {user.account_name}</p>
                            </Skeleton>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>PENDING TRANSACTIONS</p>
                            <Skeleton isLoaded={!loading}>
                                <p className='text-xs font-Inter_Regular text-black' mt-2>{pending.length}</p>
                            </Skeleton>
                        </div>

                        <div className="flex-col flex flex-1">
                            {/* <p className='text-sm font-Inter_Bold text-black'>ETH WALLET</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>0x83989P28juuSuWQ29029x092 3392</p> */}
                        </div>
                    </div>


                </div>
            </div>
            
        </div>
    )
}
