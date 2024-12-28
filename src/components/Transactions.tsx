import { randomUUID } from 'crypto';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Transaction } from 'utils/types';

export default async function Transactions({ isUserAccount }: { isUserAccount: boolean}) {
    const router = useRouter();
    const accountId: number = isUserAccount ? Number(router.query.id) : 325975;

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/transactions/${accountId}`, fetcher)

    if(error) {
        return (
            <div>
                <p>NO TRANSACTIONS</p>
            </div>
        )
    }

    if(isLoading) {
        return (
            <div>
                <p>LOADING...</p>
            </div>
        )
    }

    return (
        <div>
            <table className='overflow-auto rounded-xl'>
                <thead>
                    <th scope='col'>Amount</th>
                    <th scope='col'>ID</th>
                    <th scope='col'>Date</th>
                </thead>
                <tbody>
                    {
                        data.forEach((transaction: Transaction, index: number) => {
                            const date = new Date(transaction.createdAt);
                            const dateFormatted = date.toLocaleString();
                            return (
                                <tr>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.transaction_id}</td>
                                    <td>{dateFormatted}</td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
        </div>
    )
}