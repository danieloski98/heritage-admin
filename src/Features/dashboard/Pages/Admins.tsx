import React from 'react'
import { InputGroup, InputLeftElement, Input, Spinner, Select } from '@chakra-ui/react'
import { FiSearch, FiEdit, FiTrash, FiEye } from 'react-icons/fi'
import EditModal from '../Components/admins/EditAdmin';
import CreateModal from '../Components/admins/AddAdmin';
import DeleteModal from '../Components/users/DeleteModal';
import { Link } from 'react-router-dom';
import { url } from '../../../utils/url';
import { IServerReturnType } from '../../../utils/types/ServerReturnType';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import useTitle from '../../../hooks/useTitle'

// recoil state
import {TokenState} from '../../../state/token'
import {TitleState} from '../../../state/title'
import { IUser } from '../../../utils/types/IUser';
import { IAdmin } from '../../../utils/types/IAdmin';

const getUsers = async (token: string) => {
    const request = await fetch(`${url}admins`, {
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

export default function Users() {
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openCreate, setOpencreate] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [filteredUsers, setFilteredUsers] = React.useState([] as Array<IAdmin>);
    const [sortBy, setSortBy] = React.useState(1);
    const [error, setError] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [activeUser, setActiveUser] = React.useState({} as IAdmin);
    const [users, setUsers] = React.useState([] as Array<IAdmin>)
    const [token, setToken] = useRecoilState(TokenState);
    // const [title, setTitle] = useRecoilState(TitleState);
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
        setTitle('Admin Management');
    });

    React.useEffect(() => {
        if (search === '') {
            setFilteredUsers([...users]);
            return;
        }
        // eslint-disable-next-line array-callback-return
        const newArr = users.filter((item, index) => {
            if (item.email?.toLowerCase().includes(search.toLowerCase()) || item.fullname?.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        });
        setFilteredUsers([...newArr]);
    }, [search, users])

    const handleEditModal = (user: IAdmin) => {
        console.log(user);
        setActiveUser(user);
        setOpenEditModal(true)

    }

    const compare = React.useCallback(( a: IAdmin, b: IAdmin ) => {
        if (sortBy === 1) {
            if ((a.fullname as string) < (b.fullname as string)) {
                return -1;
            }
        }

        if (sortBy === 2) {
            if ((a.email as string) < (b.email as string)) {
                return -1;
            }
        }
        if (sortBy === 1) {
            if ((a.createdAt as string) < (b.createdAt as string)) {
                return -1;
            }
        }
        return 0;
      }, [sortBy])

    return (
        <div className='w-full h-full flex flex-col'>

            {/* modals */}

            <EditModal user={activeUser} open={openEditModal} close={setOpenEditModal} />
            <CreateModal open={openCreate} close={setOpencreate} />
            <DeleteModal open={openDeleteModal} close={setOpenDeleteModal} />

            <div className="flex h-12 items-center">

                <div className="flex-1 mr-8">
                    <InputGroup>
                        <InputLeftElement>
                            <FiSearch color="grey" size={20} />
                        </InputLeftElement>
                        <Input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} bgColor="white" fontSize="sm" className="font-Inter_Regular" placeholder="Search by email or fullname" />
                    </InputGroup>
                </div>

                <div className="w-96  flex items-center">
                    <p className='font-Inter_Regular text-sm'>Filter</p>
                    <div className="w-56 mx-4">
                        <Select value={sortBy} onChange={(e) => setSortBy(parseInt(e.target.value))} bgColor="white" fontSize="sm" className="font-Inter_Regular">
                            {/* <option>Give me options</option> */}
                            <option value={1}>Fullname</option>
                            <option value={2}>Email</option>
                            <option value={3}>Date Joined</option>
                        </Select>
                    </div>
                    <button onClick={() => setOpencreate(true)} className='w-32 h-10 text-xs bg-btnBlue text-white font-Inter_Regular rounded-md'>create admin</button>
                </div>

            </div>

            {/* table header */}
            
            <div className="flex w-full mt-6 text-center">
                {/* <p className='font-Inter_Bold text-sm text-gray-700'>S/N</p> */}
                <p className='font-Inter_Bold text-sm text-gray-700 flex-1'>ADMIN NAME</p>
                <p className='font-Inter_Bold text-sm text-gray-700 flex-1'>ADMIN EMAIL</p>
                <p className='font-Inter_Bold text-sm text-gray-700 flex-1'>PHONE NUMBER</p>
                <p className='font-Inter_Bold text-sm text-gray-700 flex-1'>DATE JOINED</p>
                <p className='font-Inter_Bold text-sm text-gray-700 flex-1'>ROLE</p>
                <p className='font-Inter_Bold text-sm text-gray-700 flex-1'>ACTIONS</p>
            </div>

            <div className="flex-1 bg-white mt-6 rounded-md overflow-y-auto pt-10">
                {
                    search !== '' && filteredUsers.length < 1 && (
                        <div className="flex flex-col align-center items-center">
                            <div className="w-80 h-56">
                                <img src="/images/nosearch.jpg" alt="nouser" className='w-full h-full' />
                            </div>
                            <p className='text-sm font-Inter_Medium mt-4'>No Results Found for "{search}"</p>
                        </div>
                    )
                }
                {
                    search === '' && filteredUsers.length < 1 && (
                        <div className="flex flex-col align-center items-center">
                            <div className="w-80 h-56">
                                <img src="/images/nouser.jpg" alt="nouser" className='w-full h-full' />
                            </div>
                            <p className='text-sm font-Inter_Medium mt-4'>No user Found</p>
                        </div>
                    )
                }
                {
                    filteredUsers
                    .sort(compare)
                    .map((item, index) => (
                        <div key={index.toString()} className="flex items-center mt-0 text-left mb-10 px-10">
                                {/* <div className="flex-1 w-20 max-w-full">
                                    <p className='font-Inter_Regular text-sm text-gray-700 ml-8'>{index+1}</p>
                                </div> */}
                                <div className="flex-1 max-w-full">
                                    <p className='font-Inter_Regular text-sm text-gray-700'>{item.fullname}</p>
                                </div>
                                <div className="flex-1 max-w-full">
                                    <p className='font-Inter_Regular text-sm text-gray-700'>{item.email}</p>
                                </div>
                                <div className="flex-1 max-w-full">
                                    <p className='font-Inter_Regular text-sm text-gray-700 ml-6'>{item.phone}</p>
                                </div>
                                <div className="flex-1 max-w-full">
                                    <p className='font-Inter_Regular text-sm text-gray-700'>{new Date(item.createdAt as string).toDateString()}</p>
                                </div>

                                <div className="flex-1 max-w-full text-center">
                                    <p className='font-Inter_Regular text-gray-700 p-2 text-xs rounded-full bg-blue-200'>{item.role === 3 ? 'Super Admin': 'Admin'}</p>
                                </div>
                                
                                <div className="flex w-full justify-center items-center flex-1">
                                    <FiTrash size={20} color="black" className='mr-5 cursor-pointer' onClick={() => setOpenDeleteModal(true) } />
                                    <FiEdit size={20} color="black" className='mr-5 cursor-pointer' onClick={() => handleEditModal(item)} />
                                    {/* <Link to={`/dashboard/users/${item._id}`}>
                                        <FiEye size={20} color="black" className='mr-0 cursor-pointer' />
                                    </Link> */}
                                </div>

                        </div>
                    ))
                }
            </div>


        </div>
    )
}
