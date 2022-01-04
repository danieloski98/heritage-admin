import React from 'react'
import { InputGroup, Input, Spinner, InputRightElement } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const router = useNavigate();

    return (
        <div className='w-full h-screen overflow-hidden flex'>
            <div className="w-2/4 bg-black flex flex-col px-20 pt-10">
                <h1 className='font-Inter_Extra_Bold text-white text-3xl'>HX</h1>
                <h1 className="mt-16 font-Inter_Extra_Bold text-white text-4xl">Administrator Web App</h1>
                <p className="mt-2 font-Inter_Regular text-xs text-gray-400">Seamlessly manage transactions on Heritage Exchange</p>
                <div className="flex-1">
                    <img src="/images/girl.png" alt="" className='w-full h-full' />
                </div>
            </div>
            <div className="flex-1 bg-gray-200 flex flex-col items-center justify-center text-left">
                <div className="flex flex-col">
                    <h3 className='font-Inter_Bold text-2xl text-black'>Welcome Back, Admin</h3>
                    <p className='font-Inter_Regular text-gray-500 text-xs mt-2'>Sign In To Your Account To Continue</p>

                    <div className="flex flex-col mt-8">
                        <p className='font-Inter_Medium text-black text-sm '>Email</p>
                        <div className="w-80">
                            <Input bgColor="#327A7C15" fontSize="xs" className="font-Inter_Regular" />
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <p className='font-Inter_Medium text-black text-sm '>Password</p>
                        <div className="w-80">
                            <InputGroup>
                                <InputRightElement>
                                    <p className="text-xs font-Inter_Regular mr-3 cursor-pointer" onClick={() => setShow(prev => !prev)}>
                                        {show && <span>HIDE</span>}
                                        {!show && <span>SHOW</span>}
                                    </p>
                                </InputRightElement>
                                <Input type={show ? 'text':'password'} bgColor="#327A7C15" fontSize="xs" className="font-Inter_Regular" />
                            </InputGroup>
                        </div>
                    </div>

                    <button onClick={() => router('/dashboard')} className="text-sm text-white bg-btnBlue w-80 mt-2 h-10 rounded-md">
                        {!loading && <p>Submit</p>}
                        {loading && <Spinner color="white" size="md" />}
                    </button>

                    <p onClick={() => router('/forgotpassword')} className="text-center text-textBlue text-xs font-Inter_Regular cursor-pointer mt-4">Forgot Password ?</p>
                </div>
            </div>
        </div>
    )
}
