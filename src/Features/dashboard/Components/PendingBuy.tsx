import React from 'react';
import { currencyFormatterD } from '../../../utils/currencyConverter';
import { IUser } from '../../../utils/types/IUser';
import { ITransaction } from '../../../utils/types/Transaction';
import User from '../Pages/User';

export default function PendingBuy({transactions, setOpenModal,  search, sort}: {transactions: Array<ITransaction>, setOpenModal: Function, search: string, sort: number}) {

    const [filteredUsers, setFilteredUsers] = React.useState([] as Array<ITransaction>);
    React.useEffect(() => {
        if (search === '') {
            setFilteredUsers([...transactions]);
            return;
        }
        // eslint-disable-next-line array-callback-return
        const newArr = transactions.filter((item, index) => {
            if (item._id?.toLowerCase().includes(search.toLowerCase()) || item.user.first_name?.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        });
        setFilteredUsers([...newArr]);
    }, [search, transactions])

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

    const compare = React.useCallback(( a: ITransaction, b: ITransaction ) => {
        if (sort === 1) {
            if ((a.user.first_name as string) < (b.user.first_name as string)) {
                return -1;
            }
        }

        if (sort === 2) {
            if ((a._id as string) < (b._id as string)) {
                return -1;
            }
        }
        return 0;
      }, [sort]);

  return  (
    <div className="flex-1 p-6 flex flex-col overflow-auto">
    {
        filteredUsers.length < 1 && (
            <div className="ww-full h-full flex flex-col items-center justify-center">
                    <img src="/images/nosearch.jpg" className='w-72 h-56' alt="empty"/>
                    No record found
            </div>
        )
    }
    {
        filteredUsers.length > 0 && filteredUsers
        .sort(compare)
        .map((item, index) => (
          <div key={index.toString()} className="flex mb-8">
              <div className="flex-1 flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                  <p className='text-xs text-gray-600 font-Inter_Regular'>{item.user.first_name} {item.user.last_name}</p>
              </div>
  
              <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                  <p className='text-xs text-gray-600 font-Inter_Regular'>#{item._id}</p>
              </div>

              <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                  <p className='text-xs text-gray-600 font-Inter_Regular'>{coinCheck(item.coin_type)} ({walletCheck(item.coin_type, item.user)})</p>
              </div>
  
              <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                  <p className='text-xs text-gray-600 font-Inter_Regular'>{item.user.bank_name}-{item.user.account_number}</p>
              </div>
  
              <div className="flex-1  flex items-center justify-center font-Inter_Medium text-sm text-gray-600">
                  <p className='text-xs text-gray-600 font-Inter_Regular'>${currencyFormatterD(item.amount)}</p>
              </div>
  
              <div className="flex-1  flex flex-col items-center justify-center font-Inter_Medium text-smtext-gray-600">
                  <div className="w-32 h-8 flex items-center justify-center border-2 border-gray-600 text-xs font-Inter_Medium rounded-full">
                     {colorCheck(item.status)}
                     {statusCheck(item.status)}
                  </div>
                  <p onClick={() => setOpenModal(item)} className="underline text-xs mt-2 cursor-pointer">Review</p>
              </div>
         </div>
        ))
    }
  </div>
  )
 
}
