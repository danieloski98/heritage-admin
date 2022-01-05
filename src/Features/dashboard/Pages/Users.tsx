import React from 'react'
import { InputGroup, InputLeftElement, Input, Spinner, Select } from '@chakra-ui/react'
import { FiSearch, FiEdit, FiTrash, FiEye } from 'react-icons/fi'
import EditModal from '../Components/users/EditModal';
import DeleteModal from '../Components/users/DeleteModal';
import { Link } from 'react-router-dom'

const arr = [1,2,1,2,3,2,3,455,4,3,2,3,4,5,34];

export default function Users() {
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    return (
        <div className='w-full h-full flex flex-col'>

            {/* modals */}

            <EditModal open={openEditModal} close={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} close={setOpenDeleteModal} />

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

            {/* table header */}
            
            <div className="grid grid-cols-6 gap-1 mt-6 text-center">
                <p className='font-Inter_Bold text-sm text-gray-700'>S/N</p>
                <p className='font-Inter_Bold text-sm text-gray-700'>CUSTOMER NAME</p>
                <p className='font-Inter_Bold text-sm text-gray-700'>CUSTOMER EMAIL</p>
                <p className='font-Inter_Bold text-sm text-gray-700'>PHONE NUMBER</p>
                <p className='font-Inter_Bold text-sm text-gray-700'>DATE JOINED</p>
                <p className='font-Inter_Bold text-sm text-gray-700'>ACTION</p>
            </div>

            <div className="flex-1 bg-white mt-6 rounded-md overflow-y-auto pt-10">
                {
                    arr.map((item, index) => (
                        <div key={index.toString()} className="grid grid-cols-6 gap-1 mt-0 text-center mb-10">
                                <p className='font-Inter_Regular text-sm text-gray-700'>{index+1}</p>
                                <p className='font-Inter_Regular text-sm text-gray-700'>Daniel Emmanuel</p>
                                <p className='font-Inter_Regular text-sm text-gray-700'>Daniel@gmail.com</p>
                                <p className='font-Inter_Regular text-sm text-gray-700'>08033634507</p>
                                <p className='font-Inter_Regular text-sm text-gray-700'>{new Date().toDateString()}</p>

                                <div className="flex w-full justify-center items-center">
                                    <FiTrash size={20} color="black" className='mr-5 cursor-pointer' onClick={() => setOpenDeleteModal(true)} />
                                    <FiEdit size={20} color="black" className='mr-5 cursor-pointer' onClick={() => setOpenEditModal(true)} />
                                    <Link to="/dashboard/users/23">
                                        <FiEye size={20} color="black" className='mr-0 cursor-pointer' />
                                    </Link>
                                </div>

                        </div>
                    ))
                }
            </div>


        </div>
    )
}
