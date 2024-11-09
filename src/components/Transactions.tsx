import { useRouter } from 'next/router';
import getTransactions from '../../utils/getTransactions'

export default async function Transactions({ isUserAccount }: { isUserAccount: boolean}) {
    const router = useRouter();
    const accountId: number = Number(router.query.id);
    const transactions = await getTransactions(isUserAccount, accountId);
    console.log(transactions);

    return (
        <div>
            <p>NO TRANSACTIONS</p>
            {
                // transactions.map((transaction: any, index: number) => {
                //     return (
                //         <div>

                //         </div>
                //     )
                // })
            }
        </div>
    )
}