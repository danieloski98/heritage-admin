import React from 'react'
import { InputGroup, InputLeftElement, Input, Spinner, Select } from '@chakra-ui/react'
import { FiSearch, FiEdit, FiTrash, FiEye } from 'react-icons/fi'
import EditModal from '../Components/users/EditModal';
import DeleteModal from '../Components/users/DeleteModal';
import { Link } from 'react-router-dom';
import { url } from '../../../utils/url';
import { IServerReturnType } from '../../../utils/types/ServerReturnType';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import useTitle from '../../../hooks/useTitle'

// recoil state
import {TokenState} from '../../../state/token'
import { IUser } from '../../../utils/types/IUser';

const getUsers = async (token: string) => {
    const request = await fetch(`${url}user`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const json = await request.json() as IServerReturnType;
    if (!request.ok) {
        throw new Error('An occured');
    }
    return json;
}

const arr = [1,2,1,2,3,2,3,455,4,3,2,3,4,5,34];

export default function Users() {
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [activeUser, setActiveUser] = React.useState({} as IUser);
    const [users, setUsers] = React.useState([] as Array<IUser>)
    const [token, setToken] = useRecoilState(TokenState);
    const {setTitle} = useTitle();


    // getuser query
    const getUser = useQuery(['getUsers', token], () => getUsers(token), {
        onSuccess: (data) => {

            setUsers(data.data);
            setLoading(false);
        },
        onError: () => {
            setLoading(false);
            setError(true);
        }
    });

    React.useEffect(() => {
        setTitle('User Management');
    });

    const handleEditModal = (user: IUser) => {
        setActiveUser(user);
        setOpenDeleteModal(true)

    }

    return (
        <div className='w-full h-full flex flex-col'>

            {/* modals */}

            <EditModal user={activeUser} open={openEditModal} close={setOpenEditModal} />
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
                    users.map((item, index) => (
                        <div key={index.toString()} className="flex mt-0 text-center mb-10">
                                <p className='font-Inter_Regular text-sm text-gray-700 flex-1'>{index+1}</p>
                                <p className='font-Inter_Regular text-sm text-gray-700 flex-1'>{item.first_name} {item.last_name}</p>
                                <p className='font-Inter_Regular text-sm text-gray-700 flex-1'>{item.email}</p>
                                <p className='font-Inter_Regular text-sm text-gray-700 flex-1'>{item.phone}</p>
                                <p className='font-Inter_Regular text-sm text-gray-700 flex-1'>{new Date(item.createdAt).toDateString()}</p>

                                <div className="flex w-full justify-center items-center flex-1">
                                    <FiTrash size={20} color="black" className='mr-5 cursor-pointer' onClick={() => handleEditModal(item) } />
                                    <FiEdit size={20} color="black" className='mr-5 cursor-pointer' onClick={() => setOpenEditModal(true)} />
                                    <Link to={`/dashboard/users/${item._id}`}>
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
