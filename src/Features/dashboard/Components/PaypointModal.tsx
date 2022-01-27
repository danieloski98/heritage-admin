import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Select, Input, InputGroup, InputLeftElement, Divider, useToast, Spinner } from '@chakra-ui/react'
import {useRecoilState} from 'recoil'
import { useQuery } from 'react-query';
import { url } from '../../../utils/url';
import { IServerReturnType } from '../../../utils/types/ServerReturnType';

import { useFormik } from 'formik'
import * as yup from 'yup'

import {IPaypoint, PaypointState} from '../../../state/paypoint'
import {TokenState} from '../../../state/token'


const getPaypoint = async () => {
    const request = await fetch(`${url}paypoint`, {
        method: 'get',
    });
    const json = await request.json() as IServerReturnType;
    if (!request.ok) {
        throw new Error('An error occured');
    }
    return json
}

const validationSchema = yup.object({
    btc: yup.string().required('Bitcoin wallet address is required'),
    eth: yup.string().required(),
    usdt: yup.string().required(),
    rate: yup.number().required(),
});

interface IProps {
    open: boolean;
    close: Function
}

export default function PaypointModal({ open, close}: IProps) {
    const [paypoint, setPaypoint] = React.useState({} as IPaypoint);
    const [paypointG, setPaypointG] = useRecoilState(PaypointState);
    const [token, setToken] = useRecoilState(TokenState);
    const [loading, setLoading] = React.useState(false);

    const toast = useToast();

    const query = useQuery('getpaypoint', getPaypoint, {
        enabled: true,
        retryOnMount: true,
        onSuccess: (data) => {
            const paypointlocal = data.data as IPaypoint;
            setPaypoint(paypointlocal);
            setPaypointG(paypointlocal);
        },
        onError: () => {
            toast({
                isClosable: true,
                position: 'bottom',
                title: 'Error',
                description: 'An error occured while fetching the paypoint',
                status: 'error',
            })
        }
    });

    const formik = useFormik({
        initialValues: {
            btc: paypoint.bitcoin_wallet,
            eth: paypoint.etheruem_wallet,
            usdt: paypoint.usdt_wallet,
            rate: paypoint.rate,
        },
        validationSchema,
        onSubmit: () => {},
        enableReinitialize: true
    });


    const submit = async () => {
        if (!formik.dirty) {
            toast({
                title: 'Message',
                description: 'Make a change first',
                status: 'warning',
                isClosable: true,
                duration: 4000,
                position: 'top-right'
            });
            return;
        }
        if (!formik.isValid) {
            toast({
                title: 'Error',
                description: 'Fill in the form properly',
                status: 'error',
                isClosable: true,
                duration: 4000,
                position: 'top-right'
            });
            return;
        }
        setLoading(true);
        const request = await fetch(`${url}paypoint`, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formik.values),
        });
        const json = await request.json() as IServerReturnType;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                status: 'error',
                isClosable: true,
                duration: 4000,
                position: 'top-right'
            });
            return;
        }
        toast({
            title: 'Message',
            description: json.successMessage,
            status: 'success',
            isClosable: true,
            duration: 4000,
            position: 'top-right'
        });

    }
    return (
        <Modal isOpen={open} onClose={() => {formik.resetForm(); close(false)}} isCentered closeOnEsc closeOnOverlayClick={false} size="xs">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody className='pt-8'>
                    <p className='text-xl font-Inter_Bold text-black mt-6'>PayPoint / Rate</p>

                    <div className="mt-6 flex">
                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Admin Bitcoin Wallet</p>
                            <Input name="btc" value={formik.values.btc} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                            onFocus={() => formik.setFieldTouched('btc', true, true)} bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                            {formik.touched.btc && formik.errors.btc && (
                                <p className='mt-2 text-red-400 font-Inter_Regular text-sm'>{formik.errors.btc}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Admin Ethereum Wallet</p>
                            <Input name="eth" value={formik.values.eth} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                            onFocus={() => formik.setFieldTouched('eth', true, true)}  bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                            {formik.touched.eth && formik.errors.eth && (
                                <p className='mt-2 text-red-400 font-Inter_Regular text-sm'>{formik.errors.eth}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Admin Tether (Usdt -Erc20)Wallet</p>
                            <Input name="usdt" value={formik.values.usdt} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                            onFocus={() => formik.setFieldTouched('usdt', true, true)}  bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                            {formik.touched.usdt && formik.errors.usdt && (
                                <p className='mt-2 text-red-400 font-Inter_Regular text-sm'>{formik.errors.usdt}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex">
                       <Divider />
                    </div>

                    <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Exchange Rate (In Naira)</p>
                            <InputGroup>
                                <InputLeftElement>
                                    <span className="text-Inter_Medium mt-0 text-sm">N</span>
                                </InputLeftElement>
                                <Input type="number" name="rate" value={formik.values.rate} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                            onFocus={() => formik.setFieldTouched('rate', true, true)}  bgColor="#327A7C15" fontSize="xs" className='mt-0 font-Inter_Regular' />
                            </InputGroup>
                            {formik.touched.rate && formik.errors.rate && (
                                <p className='mt-2 text-red-400 font-Inter_Regular text-sm'>{formik.errors.rate}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-2 mb-12 flex justify-end">
                        <div className="w-40 flex flex-col">
                            <button disabled={loading} onClick={submit} className="w-full h-10 text-white text-sm font-Inter_Regular bg-btnBlue rounded-md">
                                {loading && <Spinner color="white" size="md" />}
                                {!loading && <span>Update</span>}
                            </button>
                        </div>
                    </div>

                    

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
