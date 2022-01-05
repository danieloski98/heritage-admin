import React from 'react'
import { InputGroup, InputLeftElement, Input, Spinner, Select } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import TransactionModal from '../Components/TransactionModal';

const arr = [1,2,1,2,3,2,3,455,4,3,2,3,4,5,34];

const ACTIVE = 'flex-1 border-b-2 border-btnBlue flex items-center justify-center font-Inter_Medium text-sm cursor-pointer text-btnBlue';
const INACTIVE = 'flex-1  flex items-center justify-center font-Inter_Medium text-sm cursor-pointer text-gray-400';

export default function PendingTransactions() {
    const [tab, setTab] = React.useState(1);
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <div className='w-full h-full flex flex-col'>

            <TransactionModal open={openModal} close={setOpenModal} />
            
            {/* Header */}

            <div className="flex h-12 items-center">

                <div className="flex-1 mr-8">
                    <InputGroup>
                        <InputLeftElement>
                            <FiSearch color="grey" size={20} />
                        </InputLeftElement>
                        <Input bgColor="white" fontSize="sm" className="font-Inter_Regular" placeholder="Search by email or fullname" />
                    </InputGroup>
                </div>

                <div className="w-96  flex items-center">
                    <p className='font-Inter_Regular text-sm'>Filter</p>
                    <div className="w-56 mx-4">
                        <Select bgColor="white" fontSize="sm" className="font-Inter_Regular">
                            <option>Give me options</option>
                        </Select>
                    </div>
                    <button className='w-24 h-10 bg-btnBlue text-white font-Inter_Regular rounded-md'>Apply</button>
                </div>

            </div>

          

            <div className="flex-1 h-80 bg-white mt-6 flex-col flex">

                  {/* tabbar */}
                <div className="w-full h-12 flex text-center px-6">
                    <div className={tab === 1 ? ACTIVE:INACTIVE} onClick={() => setTab(1)}>
                        <p>Savings Withdrawals</p>
                    </div>

                    <div className={tab === 2 ? ACTIVE:INACTIVE} onClick={() => setTab(2)}>
                        <p>Savings Deposits</p>
                    </div>

                    <div className={tab === 3 ? ACTIVE:INACTIVE} onClick={() => setTab(3)}>
                        <p>Crypto Purchases</p>
                    </div>

                    <div className={tab === 4 ? ACTIVE:INACTIVE} onClick={() => setTab(4)}>
                        <p>Crypto Sales</p>
                    </div>
                </div>

                 {/* table header */}

                <div className="w-full flex h-12 bg-gray-300 px-6">
                    <div className="flex-1 flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>CUSTOMER NAME</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>TRANSACTION ID</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>DESTINATION</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>SOURCE</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>AMOUNT</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>STATUS</p>
                    </div>
                </div>

                {/* main body */}

                <div className="flex-1 p-6 flex flex-col overflow-auto">
                  {
                      arr.map((item, index) => (
                        <div key={index.toString()} className="flex mb-8">
                            <div className="flex-1 flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                                <p className='text-xs text-gray-600 font-Inter_Regular'>Johnson Nnamdi</p>
                            </div>
    
                            <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                                <p className='text-xs text-gray-600 font-Inter_Regular'>#5278399292922</p>
                            </div>
    
                            <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                                <p className='text-xs text-gray-600 font-Inter_Regular'>ZENITH- 0238393833</p>
                            </div>
    
                            <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                                <p className='text-xs text-gray-600 font-Inter_Regular'>USDT WALLET (SAVINGS)</p>
                            </div>
    
                            <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                                <p className='text-xs text-gray-600 font-Inter_Regular'>$300</p>
                            </div>
    
                            <div className="flex-1  flex flex-col items-center justify-center font-Inter_Medium text-smtext-gray-600">
                                <div className="w-32 h-8 flex items-center justify-center border-2 border-gray-600 text-xs font-Inter_Medium rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400 mr-4"></div>
                                    <span>Processing</span>
                                </div>
                                <p onClick={() => setOpenModal(true)} className="underline text-xs mt-2 cursor-pointer">Review</p>
                            </div>
                       </div>
                      ))
                  }
                </div>

            </div>

        </div>
    )
}
