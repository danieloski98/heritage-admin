import React from 'react'
import { FiAlignLeft, FiGrid } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    const router = useNavigate();
    return (
        <div className='flex flex-col w-full h-full'>

            <div className="w-full h-24 flex items-center px-5">
                <FiAlignLeft color="white" size={30} />
                <p className='font-Inter_Bold text-xl text-white ml-6'>HX ADMIN</p>
            </div>

            <div className="flex-1 flex flex-col px-5 pt-10">
                <div className="flex items-center">
                    <FiGrid color="white" size={30} />
                    <Link to="/dashboard">
                    <p className='font-Inter_Regular text-sm text-gray-300 ml-4 cursor-pointer'>Admin Dashboard</p>
                    </Link>
                </div>

                <p className="text-md font-Inter_Bold text-gray-200 mt-6 mb-8">Management</p>

                <Link to="/dashboard/users">
                    <p className='font-Inter_Regular text-sm text-gray-300 ml-6 mb-5 cursor-pointer'>User Management</p>
                </Link>
                
                <Link to="/dashboard/pending">
                    <p className='font-Inter_Regular text-sm text-gray-300 ml-6 mb-5 cursor-pointer'>Pending Transactions</p>
                </Link>

                <Link to="/dashboard/transactions">
                    <p className='font-Inter_Regular text-sm text-gray-300 ml-6 mb-5 cursor-pointer'>Transaction History</p>
                </Link>

                <p className="text-md font-Inter_Bold text-gray-200 mt-6 mb-8">PAYPOINTS / RATE</p>
                <p className='font-Inter_Regular text-sm text-gray-300 ml-6 mb-5 cursor-pointer'>User Management</p>
            </div>

            <div className="w-full h-24 flex items-center justify-center cursor-pointer">
                <p className='font-Inter_Medium text-md text-white'>Logout</p>
            </div>
            
        </div>
    )
}
