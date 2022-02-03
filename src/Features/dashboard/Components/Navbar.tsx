import React from 'react'
import { FiMail, FiBell } from 'react-icons/fi'
import { Divider, Avatar } from '@chakra-ui/react'
import useTitle from '../../../hooks/useTitle'
import { Link } from 'react-router-dom'

// redux
import { useRecoilState } from 'recoil';
import {UserState} from '../../../state/details'

export default function Navbar() {
    const {title} = useTitle();
    const [details, _] = useRecoilState(UserState);
    const icon = `https://avatars.dicebear.com/api/human/${details.email}.svg`;
    return (
        <div className='w-full h-24 bg-white shadow-md flex px-10 justify-between items-center'>
            <div className="flex-1">
                <p className='font-Inter_Bold text-md '>{title}</p>
            </div>
            <div className="flex-1 flex justify-end">
                {/* <div className="w-12 h-12 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center">
                    <FiMail size={20} color="grey" />
                </div>

                <div className="w-12 h-12 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center ml-4">
                    <FiBell size={20} color="grey" />
                </div>

                <div className='ml-4'>
                    <Divider orientation="vertical" />
                </div> */}

                <div className="w-12 h-12 bg-gray-200 rounded-full cursor-pointer flex items-center justify-center ml-4">
                    <Link to="/dashboard/profile">
                        <Avatar src={icon} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
