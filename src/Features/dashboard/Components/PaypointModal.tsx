import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Select, Input, InputGroup, InputLeftElement, Divider } from '@chakra-ui/react'

interface IProps {
    open: boolean;
    close: Function
}

export default function PaypointModal({ open, close}: IProps) {
    return (
        <Modal isOpen={open} onClose={() => close(false)} isCentered closeOnEsc closeOnOverlayClick={false} size="xs">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody className='pt-8'>
                    <p className='text-xl font-Inter_Bold text-black mt-6'>PayPoint / Rate</p>

                    <div className="mt-6 flex">
                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Admin Bitcoin Wallet</p>
                            <Input bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>
                    </div>

                    <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Admin Ethereum Wallet</p>
                            <Input bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>
                    </div>

                    <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Admin Tether (Usdt -Erc20)Wallet</p>
                            <Input bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
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
                                    <span className="text-Inter_Medium mt-3">N</span>
                                </InputLeftElement>
                                <Input type="number" bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="mt-2 mb-12 flex justify-end">
                        <div className="w-40 flex flex-col">
                            <button className="w-full h-10 text-white text-sm font-Inter_Regular bg-btnBlue rounded-md">Update</button>
                        </div>
                    </div>

                    

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
