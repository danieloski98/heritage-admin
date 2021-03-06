import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Select, Input } from '@chakra-ui/react'

interface IProps {
    open: boolean;
    close: Function
}

export default function DeleteModal({ open, close}: IProps) {
    return (
        <Modal isOpen={open} onClose={() => close(false)} isCentered closeOnEsc closeOnOverlayClick={false} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody className='pt-8'>
                    <p className='text-xl font-Inter_Bold text-black mt-6'>Delete User</p>
                    <p className='mt-2 text-sm text-red-400 font-Inter_Regular'>This action cannot be reversed. Enter your password to proceed</p>

                    <div className="mt-4 flex">
                        <div className="flex-1 flex flex-col pr-4">
                            <p className="text-sm text-gray-600 font-Inter_Regular">Password</p>
                            <Input type="password" bgColor="#327A7C15" fontSize="xs" className='mt-2 font-Inter_Regular' />
                        </div>
                    </div>


                    <div className="mt-2 mb-12 flex">
                        <div className="w-40 flex flex-col pr-4">
                            <button className="w-full h-10 text-white text-sm font-Inter_Regular bg-btnBlue rounded-md">Update</button>
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
