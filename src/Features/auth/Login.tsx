import React from 'react'
import { InputGroup, Input, Spinner, InputRightElement, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik'
import { url } from '../../utils/url';
import { IServerReturnType } from '../../utils/types/ServerReturnType';
import { useRecoilState } from 'recoil';

// states
import {UserState} from '../../state/details'
import {TokenState} from '../../state/token'
import useTitle from '../../hooks/useTitle'

// validation Schema
const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [user, setUser] = useRecoilState(UserState);
    const [token, setToken] = useRecoilState(TokenState);
    const { setTitle } = useTitle();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: () => {},
        validationSchema,
    });

    const router = useNavigate();

    const submit = async () => {
        if (!formik.dirty) {
            toast({
                isClosable: true,
                position: 'top',
                status: 'error',
                description: 'fillin the form',
                duration: 5000
            });
            return;
        }
        if (!formik.isValid) {
            toast({
                isClosable: true,
                position: 'top',
                status: 'error',
                description: 'fillin the form correctly',
                duration: 4000,
            });
            return;
        }

        setLoading(true);
        const request = await fetch(`${url}admins/login`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formik.values),
        });

        const json = await request.json() as IServerReturnType;
        setLoading(false);

        if (json.statusCode !== 200) {
            toast({
                isClosable: true,
                position: 'top',
                status: 'error',
                description: json.errorMessage,
                duration: 5000
            });
            return;
        } else {
            console.log(json);
            toast({
                isClosable: true,
                position: 'top',
                status: 'success',
                description: json.successMessage,
                duration: 5000
            });
            setUser(json.data.user);
            setToken(json.data.token);
            setTitle('Admin Dashboard');
            router('/dashboard');
            return;
        }
    }

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
                            <Input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('email', true, true)} bgColor="#327A7C15" fontSize="xs" className="font-Inter_Regular" />
                            {formik.touched.email && formik.errors.email && (
                                <p className='text-xs text-red-500 mt-2 font-Inter_Regular'>{formik.errors.email}</p>
                            )}
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
                                <Input type={show ? 'text':'password'} name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('password', true, true)} bgColor="#327A7C15" fontSize="xs" className="font-Inter_Regular" />
                            </InputGroup>
                            {formik.touched.password && formik.errors.password && (
                                <p className='text-xs text-red-500 mt-2 font-Inter_Regular'>{formik.errors.password}</p>
                            )}
                        </div>
                    </div>

                    <button onClick={submit} className="text-sm text-white bg-btnBlue w-80 mt-4 h-10 rounded-md">
                        {!loading && <p>Submit</p>}
                        {loading && <Spinner color="white" size="md" />}
                    </button>

                    <p onClick={() => router('/forgotpassword')} className="text-center text-textBlue text-xs font-Inter_Regular cursor-pointer mt-4">Forgot Password ?</p>
                </div>
            </div>
        </div>
    )
}
