import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Select } from '@chakra-ui/react'

interface IProps {
    open: boolean;
    close: Function
}

export default function TransactionModal({ open, close}: IProps) {
    return (
        <Modal isOpen={open} onClose={() => close(false)} isCentered closeOnEsc closeOnOverlayClick={false} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody className='pt-8'>
                    <div className="flex w-full justify-between mt-10 items-center">
                        <div className="flex flex-col">
                            <p className='text-md font-Inter_Bold text-black'>Transaction Details</p>
                            <p className='text-xs font-Inter_Regular text-black'>ID : #5278399292922</p>
                        </div>
                        <div className="w-32 h-8 flex items-center justify-center border-2 border-gray-600 text-xs font-Inter_Medium rounded-full">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mr-4"></div>
                            <span>Processing</span>
                        </div>
                    </div>

                    <p className='text-xs font-Inter_Regular text-black mt-8'>Customer</p>
                    <p className='text-md font-Inter_Bold text-black'>Johnson Nnamdi</p>


                    <div className="mt-6 flex justify-between">
                        <div className="flex-1 flex flex-col">
                            <p className="text-xs text-gray-600 font-Inter_Regular">Requested Withdrawal From</p>
                            <p className='text-sm font-Inter_Bold text-black'>USDT WALLET (SAVINGS)</p>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <p className="text-xs text-gray-600 font-Inter_Regular">Requested Withdrawal To</p>
                            <p className='text-sm font-Inter_Bold text-black'>Zenith Bank -0328829292 Johnson Nnamdi</p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <div className="flex-1 flex flex-col">
                            <p className="text-xs text-gray-600 font-Inter_Regular">Amount</p>
                            <p className='text-sm font-Inter_Bold text-black'>$3000 (N1,500,000)</p>
                        </div>
                        <div className="flex-1 flex flex-col">
                            {/* <p className="text-xs text-gray-600 font-Inter_Regular">Requested Withdrawal To</p>
                            <p className='text-sm font-Inter_Bold text-black'>Zenith Bank -0328829292 Johnson Nnamdi</p> */}
                        </div>
                    </div>

                    <p className="text-center underline text-btnBlue text-xs font-Inter_Regular cursor-pointer mt-5">View In Block Explorer</p>

                    <div className="w-full p-3 bg-red-100 rounded-md mt-5 text-red-600 font-Inter_Regular text-xs">
                        <p className='font-Inter_Regular text-xs'>Please confirm and make payment to the account above, then switch the status to processed</p>
                    </div>


                    <div className="mt-8 mb-4 flex items-center">
                        <p className='font-Inter_Regular text-sm'>Status :</p>
                        <div className="flex-1 ml-4">
                            <Select bgColor="#327A7C15" fontSize="xs" >
                                <option value="">Pending</option>
                                <option value="">Approved</option>
                                <option value="">Declined</option>
                            </Select>
                        </div>
                    </div>

                    

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
