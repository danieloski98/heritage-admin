import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import faker from 'faker';
  import {useQuery} from 'react-query';
  import { url } from '../../../utils/url';
  import { IServerReturnType } from '../../../utils/types/ServerReturnType';
  import { currencyFormatterD, currencyFormatterNGN } from '../../../utils/currencyConverter';
  import {useRecoilState} from 'recoil';
  import {TitleState} from '../../../state/title'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Bitcoin',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Etheruem',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 45)',
        backgroundColor: 'rgba(53, 162, 45, 0.5)',
      },
      {
        label: 'Tether',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

const getanalytics = async () => {
  const request = await fetch(`${url}admins/analytics`, {
    method: 'get',
  });
  const json = await request.json() as IServerReturnType;

  if (!request.ok) {
    throw new Error('An Error occured');
  }

  return json;
}

export default function Dashboard() {
  const [_, setTitle] = useRecoilState(TitleState);
  const [ana, setAna] = React.useState({
    users: 1,
    pending: 0,
    transactions: 5,
    btc_amount: 63123204.1015625,
    eth_amount: 0,
    usdt_amount: 0,
    total: 0,
  })
  const query = useQuery('getAnalytics', getanalytics, {
    onSuccess: (data) => {
      setAna(data.data);
    }
  });

  React.useEffect(() => {
    setTitle('Overview');
  });
    return (
        <div className='w-full h-full flex flex-col pb-10'>

            <div className="w-full h-auto grid grid-cols-4 gap-1">

                <div className="flex flex-col p-3 w-56 rounded-md bg-white mb-4">
                    <p className='text-sm font-Inter_Medium text-gray-600'>TOTAL USERS</p>
                    <p className='text-2xl text-black mt-3 font-Inter_Extra_Bold'>{ana.users}</p>
                </div>

                <div className="flex flex-col p-3 w-56 rounded-md bg-white mb-4">
                    <p className='text-sm font-Inter_Medium text-gray-600'>TOTAL PENDING</p>
                    <p className='text-2xl text-black mt-3 font-Inter_Extra_Bold'>{ana.pending}</p>
                </div>

                <div className="flex flex-col p-3 w-56 rounded-md bg-white mb-4">
                    <p className='text-sm font-Inter_Medium text-gray-600'>APPROVED TRANSACTIONS</p>
                    <p className='text-xl text-black mt-3 font-Inter_Extra_Bold'>{ana.transactions}</p>
                </div>

                <div className="flex flex-col p-3 w-56 rounded-md bg-white mb-4">
                    <p className='text-sm font-Inter_Medium text-gray-600'>APPROVED SALES</p>
                    <p className='text-xl text-black mt-3 font-Inter_Extra_Bold'>NGN {currencyFormatterNGN(ana.total)}</p>
                </div>

                <div className="flex flex-col p-3 w-56 rounded-md bg-white mb-4">
                    <p className='text-sm font-Inter_Medium text-gray-600'>TOTAL BITCOIN SOLD</p>
                    <p className='text-xl text-black mt-3 font-Inter_Extra_Bold'>NGN {currencyFormatterNGN(ana.btc_amount)}</p>
                </div>

                <div className="flex flex-col p-3 w-56 rounded-md bg-white mb-4">
                    <p className='text-sm font-Inter_Medium text-gray-600'>TOTAL ETHERUEM SOLD</p>
                    <p className='text-xl text-black mt-3 font-Inter_Extra_Bold'>NGN {currencyFormatterNGN(ana.eth_amount)}</p>
                </div>

                <div className="flex flex-col p-3 w-56 rounded-md bg-white mb-4">
                    <p className='text-sm font-Inter_Medium text-gray-600'>TOTAL USDT SOLD</p>
                    <p className='text-xl text-black mt-3 font-Inter_Extra_Bold'>NGN {currencyFormatterNGN(ana.usdt_amount)}</p>
                </div>

            </div>

            <div className="flex-1 flex flex-col mt-6">

                <div className="w-full flex justify-between">
                    <div className="flex-1 flex flex-col">
                        <p className='text-2xl font-Inter_Bold text-black'>Transaction History</p>
                        <p className='text-sm text-gray-600 font-Inter_Regular'>Here’s a summary of total transactions on Heritage Exchange</p>
                    </div>
                    <div className="flex-1 h-26 flex justify-end items-center">
                        {/* <div className="w-72 rounded-full bg-white h-10 flex justify-between px-3 items-center">
                            <div className="flex-1 h-8 flex items-center justify-center rounded-md text-white bg-black">
                                1D
                            </div>

                            <div className="flex-1 h-8 flex items-center justify-center rounded-md text-black">
                                5D
                            </div>

                            <div className="flex-1 h-8 flex items-center justify-center rounded-md text-black">
                                1D
                            </div>

                            <div className="flex-1 h-8 flex items-center justify-center rounded-md text-black">
                                1Y
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="flex-1 bg-white p-3 mt-6 mb-6 rounded-md">
                    <Line options={options} data={data} />
                </div>


            </div>

        </div>
    )
}
