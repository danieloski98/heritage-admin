import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Select, Input, Spinner, useToast } from '@chakra-ui/react'
import { IUser } from '../../../../utils/types/IUser'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { url } from '../../../../utils/url';
import { useRecoilState } from 'recoil'

// state
import {TokenState} from '../../../../state/token'
import { IServerReturnType } from '../../../../utils/types/ServerReturnType';


interface IProps {
    open: boolean;
    close: Function;
    user?: IUser;
}

export default function EditModal({ open, close, user}: IProps) {
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = useRecoilState(TokenState);
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            email: user?.email,
            phone: user?.phone,
            first_name: user?.first_name,
            last_name: user?.last_name
        },
        onSubmit: () => {},
        enableReinitialize: true,
    });

    const submit = async () => {
        if (!formik.dirty) {
            toast({
                description: 'You have to make a change first',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                title: 'Warning'
            });
            return;
        }
        setLoading(true);
        const request = await fetch(`${url}user/admin/edit/${user?._id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formik.values),
        });
        const json = await request.json() as IServerReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                description: json.errorMessage,
                status: 'error',
                isClosable: true,
                duration: 5000,
                title: 'Error',
                position: 'top'
            });
            return;
        } else {
            toast({
                description: json.successMessage,
                status: 'success',
                isClosable: true,
                duration: 5000,
                title: 'Message',
                position: 'top'
            });
            return;
        }
    }
    return (
        <Modal isOpen={open} onClose={() => close(false)} isCentered closeOnEsc closeOnOverlayClick={false} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody className='pt-8'>
                    <p className='text-xl font-Inter_Bold text-black mt-6'>Edit Account</p>
                    <p className='mt-2 text-sm text-gray-600 font-Inter_Regular'>Only modifiable fields for this user are shown</p>

                    <div className="mt-10 flex">
                        <div className="flex-1 flex flex-col pr-4">
                            <p className="text-sm text-gray-600 font-Inter_Regular">First name</p>
                            <Input name="first_name" value={formik.values.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Last name</p>
                            <Input name="last_name" value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>
                    </div>

                    <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col pr-4">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Email</p>
                            <Input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Phone number</p>
                            <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>
                    </div>

                    {/* <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col pr-4">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Email</p>
                            <Input value={user?.email} bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Phone number</p>
                            <Input bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>
                    </div> */}

                    <div className="mt-10 mb-12 flex">
                        <div className="w-40 flex flex-col pr-4">
                            <button onClick={submit} className="w-full h-10 text-white text-sm font-Inter_Regular bg-btnBlue rounded-md">
                                {loading && <Spinner size="md" color="white" />}
                                {!loading && <span>Update</span>}
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col">
                            {/* <button className="w-full h-10 text-sm text-btnBlue font-Inter_Regular border-2 border-btnBlue rounded-md">Send Reset Link</button> */}
                        </div>
                    </div>

                    

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
