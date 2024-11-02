import { db } from '~/server/db';

export default async function getTransactions(isUserAccount: boolean, accountId: number) {    
    const transactions = (
        isUserAccount === true
        ? await db.userTransactions.findMany({
            where: {
                user_id: accountId
            }
        })

        : await db.merchantTransactions.findMany({
            where: {
                merchant_id: accountId
            }
        })
    )

    return transactions;
}