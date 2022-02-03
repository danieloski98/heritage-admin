import React from 'react'
import { Avatar, Input } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import useTitle from '../../../hooks/useTitle'

// state
import {UserState} from '../../../state/details';
import {TokenState} from '../../../state/token';

export default function Profile() {
    const [user, setUser] = useRecoilState(UserState);
    const {setTitle} = useTitle();
    const icon = `https://avatars.dicebear.com/api/human/${user.email}.svg`;

    React.useEffect(() => {
        setTitle('User Profile');
    });

    return (
        <div className='w-5/6 h-full bg-white p-8 flex flex-col'>
            <div className="flex w-full h-24">
                <Avatar src={icon} size="xl" />
                <div className="flex flex-col h-full justify-center ml-4">
                    <p className='text-md font-Inter_Bold text-black'>{user.fullname}</p>
                    <p className='text-sm text-gray-500 font-Inter_Regular'>{user.email}</p>
                </div>
            </div>

            <div className="h-32 w-5/6 flex flex-col mt-6">
                <div className="flex">
                    <div className="flex-1 flex flex-col pr-4">
                        <p className="text-sm text-gray-600 font-Inter_Regular">Email</p>
                        <Input bgColor="#327A7C15" value={user.email} fontSize="xs" className='mt-2 font-Inter_Regular' />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <p className="text-sm text-gray-600 font-Inter_Regular">Phone</p>
                        <Input value={user.phone} bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                    </div>
                </div>

                <button className="mt-3 w-56 h-10 text-white text-sm bg-btnBlue rounded-md">Update Information</button>
            </div>

            <div className="h-auto w-5/6 flex flex-col mt-6">
                <div className="flex">
                    <div className="flex-1 flex flex-col pr-4">
                        <p className="text-sm text-gray-600 font-Inter_Regular">Old Password</p>
                        <Input type="password" bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <p className="text-sm text-gray-600 font-Inter_Regular">New Password</p>
                        <Input bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                    </div>
                </div>

                <div className="flex mt-4">
                    <div className="flex-1 flex flex-col pr-4">
                        <p className="text-sm text-gray-600 font-Inter_Regular">Confirm Password</p>
                        <Input bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                    </div>

                    <div className="flex-1 flex flex-col">
                        {/* <p className="text-sm text-gray-600 font-Inter_Regular">Phone</p>
                        <Input bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' /> */}
                    </div>
                </div>

                <button className="mt-3 w-56 h-10 text-white text-sm bg-btnBlue rounded-md">Update Password</button>
            </div>

        </div>
    )
}
