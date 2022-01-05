import React from 'react'
import { FiChevronLeft, FiArrowLeftCircle, FiMoreVertical } from 'react-icons/fi'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useNavigate, Navigator, Navigate } from 'react-router-dom'

import EditModal from '../Components/users/EditModal';
import DeleteModal from '../Components/users/DeleteModal';

export default function User() {
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const loc = useNavigate();

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
                        <div className="w-32 h-32 rounded-md bg-gray-600"></div>

                        <div className="flex flex-col justify-center ml-10">
                            <p className='text-sm font-Inter_Bold text-white'>Johnson Nnamdi</p>
                            <p className='text-xs font-Inter_Regular text-white mt-3'>jamie@emailapp.com (verified)</p>
                            <p className='text-xs font-Inter_Regular text-white mt-1'>+234 813 437 5481 (verified)</p>
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
                            <p className='text-xs font-Inter_Regular text-black' mt-2>Active</p>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>SAVINGS WALLET BALANCE</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>739 USDT</p>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>TOTAL TRANSACTIONS</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>8291</p>
                        </div>
                    </div>

                    <div className="flex mt-10">
                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>USDT WALLET ADDRESS</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>0x83989p28juusuwq29029x0923392</p>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>BTC WALLET</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>0x83989P28juuSuWQ29029x0923392</p>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>ETH WALLET</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>0x83989P28juuSuWQ29029x092 3392</p>
                        </div>
                    </div>

                    <div className="flex mt-10">
                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>BANK ACCOUNT</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>0237941112, WEMA BANK, Johnson Nnamdi</p>
                        </div>

                        <div className="flex-col flex flex-1">
                            <p className='text-sm font-Inter_Bold text-black'>PENDING TRANSACTIONS</p>
                            <p className='text-xs font-Inter_Regular text-black' mt-2>10</p>
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
