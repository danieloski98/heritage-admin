import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Select, useToast, Spinner } from '@chakra-ui/react'
import { ITransaction } from '../../../utils/types/Transaction'
import { IUser } from '../../../utils/types/IUser';
import { currencyFormatterD } from '../../../utils/currencyConverter';
import { url } from '../../../utils/url';
import { IServerReturnType } from '../../../utils/types/ServerReturnType';
import {useRecoilState} from 'recoil'
import {TokenState} from '../../../state/token'
import {useLocation} from 'react-router-dom'


interface IProps {
    open: boolean;
    close: Function;
    transaction: ITransaction;
}

export default function TransactionModal({ open, close, transaction}: IProps) {
    const [status, setStatus] = React.useState(transaction.status);
    const [amount, setAmount]= React.useState(transaction.amount);
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = useRecoilState(TokenState);
    const toast = useToast();
    const location = useLocation();

    // React.useEffect(() => {
    //     updateTransaction();
    // }, [status]);

    const coinCheck = (coin: number) => {
        switch(coin) {
            case 1:{
                return 'BTC';
            }
            case 2: {
                return 'ETH';
            }
            case 3: {
                return 'USDT'
            }
        }
    }

    const walletCheck = (coin: number, user: IUser) => {
        switch(coin) {
            case 1:{
                return user.bitcoin_wallet;
            }
            case 2: {
                return user.ethereum_wallet;
            }
            case 3: {
                return user.usdt_wallet
            }
        }
    }

    const colorCheck = (status: number) => {
        switch(status) {
            case 1: {
                return <div className="w-2 h-2 rounded-full bg-yellow-400 mr-4"></div>
            }
            case 2: {
                return <div className="w-2 h-2 rounded-full bg-green-400 mr-4"></div>
            }
            case 3: {
                return <div className="w-2 h-2 rounded-full bg-red-400 mr-4"></div>
            }
        }
    }

    const statusCheck = (status: number) => {
        switch(status) {
            case 1: {
                return <span>Processing</span>
            }
            case 2: {
                return <span>Approved</span>
            }
            case 3: {
                return <span>Declined</span>
            }
        }
    }

    const updateTransaction = async () => {
        setLoading(true);
        const request = await fetch(`${url}transaction/${transaction._id}/${status}`, {
            method: 'put',
            headers: {
                authorization: `Bearer ${token}`
            }
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
        <Modal isOpen={open} onClose={() => close(false)} isCentered closeOnEsc closeOnOverlayClick={false} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody className='pt-8'>
                    <div className="flex w-full justify-between mt-10 items-center">
                        <div className="flex flex-col">
                            <p className='text-md font-Inter_Bold text-black'>Transaction Details</p>
                            <p className='text-xs font-Inter_Regular text-black'>ID : #{transaction?._id}</p>
                        </div>
                        <div className="w-32 h-8 flex items-center justify-center border-2 border-gray-600 text-xs font-Inter_Medium rounded-full">
                        {colorCheck(transaction.status)}
                        {statusCheck(transaction.status)}
                        </div>
                    </div>

                    <p className='text-xs font-Inter_Regular text-black mt-8'>Customer</p>
                    {transaction !== undefined && <p className='text-md font-Inter_Bold text-black'>{transaction?.user?.first_name} {transaction?.user?.last_name}</p>}


                    <div className="mt-6 flex justify-between">
                        {
                            transaction?.type === 1 && (
                                <div className="flex-1 flex flex-col">
                                    <p className="text-xs text-gray-600 font-Inter_Regular">Requested ({coinCheck(transaction?.coin_type)}) From</p>
                                    <p className='text-sm font-Inter_Bold text-black'>{transaction?.user.account_name} ({transaction?.user.account_number})</p>
                                </div>
                            )
                        }

                        {
                            transaction?.type === 2 && (
                                <div className="flex-1 flex flex-col">
                                    <p className="text-xs text-gray-600 font-Inter_Regular">Sold ({coinCheck(transaction.coin_type)}) From</p>
                                    <p className='text-sm font-Inter_Bold text-black'>{coinCheck(transaction.coin_type)} WALLET ({walletCheck(transaction.coin_type, transaction.user)})</p>
                                </div>
                            )
                        }

{
                            transaction.type === 1 && (
                                <div className="flex-1 flex flex-col">
                                <p className="text-xs text-gray-600 font-Inter_Regular">Requested Withdrawal To</p>
                                <p className='text-sm font-Inter_Bold text-black'>{coinCheck(transaction.coin_type)} WALLET ({walletCheck(transaction.coin_type, transaction.user)})</p>
                            </div>
                            )
                        }

                        {
                            transaction.type === 2 && (
                                <div className="flex-1 flex flex-col">
                                    <p className="text-xs text-gray-600 font-Inter_Regular">Requested Withdrawal To</p>
                                    <p className='text-sm font-Inter_Bold text-black'>{transaction?.user.account_name} - ({transaction?.user.account_number})</p>
                                </div>
                            )
                        }
                       
                        
                        {/* <div className="flex-1 flex flex-col">
                            <p className="text-xs text-gray-600 font-Inter_Regular">Requested Withdrawal To</p>
                            <p className='text-sm font-Inter_Bold text-black'>{coinCheck(transaction.coin_type)} WALLET ({walletCheck(transaction.coin_type, transaction.user)})</p>
                        </div> */}
                    </div>

                    {/* <div className="mt-6 flex justify-between">
                   
                    </div> */}

                    <div className="mt-6 flex justify-between">
                        <div className="flex-1 flex flex-col">
                            <p className="text-xs text-gray-600 font-Inter_Regular">Amount</p>
                            {transaction.amount !== null && transaction.amount !== undefined  && <p className='text-sm font-Inter_Bold text-black'>NGN{currencyFormatterD(transaction.amount)} (${currencyFormatterD(parseInt(transaction.USD))})</p>}
                        </div>
                        <div className="flex-1 flex flex-col">
                            {/* <p className="text-xs text-gray-600 font-Inter_Regular">Requested Withdrawal To</p>
                            <p className='text-sm font-Inter_Bold text-black'>Zenith Bank -0328829292 Johnson Nnamdi</p> */}
                        </div>
                    </div>

                    <div className='mt-5 flex flex-wrap'>
                    {
                        transaction.proof_of_payment !== undefined && transaction.proof_of_payment.length > 0 && transaction.proof_of_payment.map((item, index) => (
                           <a href={item} target="_blank" rel="noreferrer">
                                <img src={item} alt="img" className="w-24 h-24 mb-5 rounded-md mr-10 cursor-pointer object-fill" />
                           </a>
                        ))
                    }
                    </div>

                   
                            <p onClick={() => close(false)} className="text-center underline text-btnBlue text-xs font-Inter_Regular cursor-pointer mt-5">View In Block Explorer</p>

                    {
                        location.pathname !== '/dashboard/transactions' && (
                            <div className="w-full p-3 bg-red-100 rounded-md mt-5 text-red-600 font-Inter_Regular text-xs">
                                <p className='font-Inter_Regular text-xs'>Please confirm and make payment to the account above, then switch the status to processed</p>
                            </div>
                        )
                    }



                    {
                        location.pathname !== '/dashboard/transactions' && (
                            <div className="mt-8 mb-4 flex items-center">
                                <p className='font-Inter_Regular text-sm'>Status :</p>

                                    <div className="flex-1 ml-4">
                                        <Select bgColor="#327A7C15" value={status} onChange={(e) => setStatus(parseInt(e.target.value))} fontSize="xs" >
                                            <option value={1}>Pending</option>
                                            <option value={2}>Approved</option>
                                            <option value={3}>Declined</option>
                                        </Select>
                                    </div>

                                <button onClick={updateTransaction} className='w-24 h-10 rounded bg-btnBlue text-sm font-Inter_Regular text-white ml-2'>
                                    {loading && <Spinner color="green" size="md" />}
                                    {!loading && <span>Change</span>}
                                </button>
                            </div>
                        )
                    }

                    

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
