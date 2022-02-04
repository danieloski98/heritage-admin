import React from 'react'
import { InputGroup, InputLeftElement, Input, Select } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import TransactionModal from '../Components/TransactionModal';
import { useQuery } from 'react-query'


// context
import {useRecoilState} from 'recoil'
import {TokenState} from '../../../state/token';
import {TitleState} from '../../../state/title'
import { ITransaction } from '../../../utils/types/Transaction';
import { url } from '../../../utils/url';
import { IServerReturnType } from '../../../utils/types/ServerReturnType';
import PendingBuy from '../Components/PendingBuy';
import PendingSell from '../Components/PendingSell';

// get transactions
const getTransactions = async (token: string) => {
    const request = await fetch(`${url}transaction?pending=${true}`, {
        method: 'get',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const json = await request.json() as IServerReturnType;
    if (!request.ok) {
        throw new Error('An error occured while fetching transactions');
    }
    return json;
}


const ACTIVE = 'flex-1 border-b-2 border-btnBlue flex items-center justify-center font-Inter_Medium text-sm cursor-pointer text-btnBlue';
const INACTIVE = 'flex-1  flex items-center justify-center font-Inter_Medium text-sm cursor-pointer text-gray-400';

export default function PendingTransactions() {
    const [tab, setTab] = React.useState(3);
    const [openModal, setOpenModal] = React.useState(false);
    const [buy, setBuy] = React.useState([] as Array<ITransaction>);
    const [sell, setSell] = React.useState([] as Array<ITransaction>);
    const [search, setSearch] = React.useState('');
    const [sort, setSort] = React.useState(1);
    const [transLoading, setTransloading] = React.useState(true);
    const [transError, setTranserror] = React.useState(false);
    const [activeTrans, setActiveTrans] = React.useState({} as ITransaction);
    const [title, setTitle] = useRecoilState(TitleState);
    // const [pending, setPending] = useRecoilState(PendingState)

    React.useEffect(() => {
        setTitle('Pending Transactions')
    });

    // conntext
    const [token, _] = useRecoilState(TokenState);

    // query
    const transactionsQuery = useQuery(['getPending', token], () => getTransactions(token), {
        onSuccess: (data) => {
            const buyT = (data.data as ITransaction[]).filter((item, index) => item.type === 1);
            const sellT = (data.data as ITransaction[]).filter((item, index) => item.type === 2);
            setBuy(buyT);
            setSell(sellT);
            console.log(sellT);
            setTransloading(false);
            setTranserror(false);
            // setPending(buyT.length + sellT.length);
        },
        onError: (error) => {
            setTranserror(true);
            setTransloading(false);
        }
    })

    const tabswitcher = () => {
        switch(tab) {
            case 1: {
                return <div className="ww-full h-full flex flex-col items-center justify-center">
                    <img src="/images/nosearch.jpg" className='w-72 h-56' alt="empty"/>
                    Nothing found
                </div>
            }
            case 2: {
                return <div className="w-full h-full flex flex-col items-center justify-center ">
                    <img src="/images/nosearch.jpg" className='w-72 h-56' alt="empty"/>
                    Nothing found
                </div>
            }
            case 3: {
                return <PendingBuy transactions={buy} setOpenModal={openTransactionModal} search={search} sort={sort} />
            }
            case 4: {
                return <PendingSell transactions={sell} setOpenModal={openTransactionModal} search={search} sort={sort} />
            }
        }
    }

    const openTransactionModal = (item: ITransaction) => {
        setActiveTrans(item);
        setOpenModal(true);
    }

    return (
        <div className='w-full h-full flex flex-col'>

            <TransactionModal open={openModal} close={setOpenModal} transaction={activeTrans} />
            
            {/* Header */}

            <div className="flex h-12 items-center">

                <div className="flex-1 mr-8">
                    <InputGroup>
                        <InputLeftElement>
                            <FiSearch color="grey" size={20} />
                        </InputLeftElement>
                        <Input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} bgColor="white" fontSize="sm" className="font-Inter_Regular" placeholder="Search by ID or firstname" />
                    </InputGroup>
                </div>

                <div className="w-96  flex items-center">
                    <p className='font-Inter_Regular text-sm w-24'>Sort By</p>
                    <div className="w-full ml-4">
                    <Select value={sort} onChange={(e) => setSort(parseInt(e.target.value))} bgColor="white" fontSize="sm" className="font-Inter_Regular">
                            {/* <option>Give me options</option> */}
                            <option value={1}>Firstname</option>
                            <option value={2}>ID</option>
                        </Select>
                    </div>
                    {/* <button className='w-24 h-10 bg-btnBlue text-white font-Inter_Regular rounded-md'>Apply</button> */}
                </div>

            </div>

          

            <div className="flex-1 h-80 bg-white mt-6 flex-col flex">

                  {/* tabbar */}
                <div className="w-full h-12 flex text-center px-6">
                    <div className={tab === 1 ? ACTIVE:INACTIVE} onClick={() => setTab(1)}>
                        <p>Savings Withdrawals</p>
                    </div>

                    <div className={tab === 2 ? ACTIVE:INACTIVE} onClick={() => setTab(2)}>
                        <p>Savings Deposits</p>
                    </div>

                    <div className={tab === 3 ? ACTIVE:INACTIVE} onClick={() => setTab(3)}>
                        <p>Crypto Purchases</p>
                    </div>

                    <div className={tab === 4 ? ACTIVE:INACTIVE} onClick={() => setTab(4)}>
                        <p>Crypto Sales</p>
                    </div>
                </div>

                 {/* table header */}

                <div className="w-full flex h-12 bg-gray-300 px-6">
                    <div className="flex-1 flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>CUSTOMER NAME</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>TRANSACTION ID</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>DESTINATION</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>SOURCE</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>AMOUNT</p>
                    </div>

                    <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                        <p>STATUS</p>
                    </div>
                </div>

                {/* main body */}

               {tabswitcher()}

            </div>

        </div>
    )
}
