import { randomUUID } from 'crypto';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Transaction } from 'utils/types';

export default function Transactions({ isUserAccount }: { isUserAccount: boolean}) {
    const router = useRouter();
    const accountId: number = isUserAccount ? Number(router.query.id) : 325975;
    
    const fetcher = async (url: string) => {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ isUserAccount })
        })

        if(!res.ok) {
            const error: any = new Error('NO TRANSACTION FOUND');
            error.info = await res.json();
            error.status = res.status;
            throw error;
        }

        return res.json();
    }
    // const { data, error, isLoading } = useSWR(`/api/transactions/${accountId}`, fetcher)

    // if(data) console.log(data);
    // if(isLoading) {
    //     return (
    //         <div>
    //             <p>LOADING...</p>
    //         </div>
    //     )
    // }

    // if(error) { 
    //     return (
    //         <div>
    //             <p>NO TRANSACTIONS</p>
    //         </div>
    //     )
    // }
    const data = [
        {
            user_id: 485975,
            amount: 76,
            transaction_id: '31d00890-89e7-40ee-a3f3-b750053f5eb7',
            date_settled: 1704067200000
        },
        {
            user_id: 485975,
            amount: -93,
            transaction_id: 'f8a90797-6704-491a-b29e-c1589fa42f13',
            date_settled: 1704153600000
        },
        {
            user_id: 485975,
            amount: -82,
            transaction_id: '18414b2d-4ebc-4a37-9e90-1fb12398705d',
            date_settled: 1704240000000
        },
        {
            user_id: 485975,
            amount: -37,
            transaction_id: '9c53fbca-1397-4de8-93f0-3c2f1e7578fc',
            date_settled: 1704326400000
        },
        {
            user_id: 485975,
            amount: 42,
            transaction_id: 'e65e7092-d264-4e71-b888-2d62c7f5d7c2',
            date_settled: 1704412800000
        },
        {
            user_id: 485975,
            amount: -75,
            transaction_id: '72082702-d345-44c0-a0d1-3c233961b4d7',
            date_settled: 1704499200000
        },
        {
            user_id: 485975,
            amount: 82,
            transaction_id: 'f4c0c5e2-2096-40e7-84ec-686c78467221',
            date_settled: 1704585600000
        },
        {
            user_id: 485975,
            amount: -59,
            transaction_id: 'f61e9dbb-d40a-4df6-8a45-ebca28983775',
            date_settled: 1704672000000
        },
        {
            user_id: 485975,
            amount: 22,
            transaction_id: '68165743-bf75-40d2-ae8c-108f8d035f1b',
            date_settled: 1704758400000
        },
        {
            user_id: 485975,
            amount: -64,
            transaction_id: 'f4c95d49-c5db-4e0d-98f0-bd96fcb49d72',
            date_settled: 1704844800000
        }
    ]

    return (
        <div className='grid place-content-center pt-2'>
            <div className='overflow-auto font-thin text-sm'>
                {
                    data.map((transaction: Transaction, index: number) => {
                        const date = new Date(transaction.date_settled)
                        const dateFormatted = date.toLocaleString();
                        return (
                            <div className='mb-2 text-black rounded-lg px-6 py-4 font-bold flex space-x-11 bg-slate-300'>
                                <span>{transaction.amount}</span>
                                <span>{dateFormatted}</span>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}