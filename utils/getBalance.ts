import { db } from '~/server/db';

export default async function getBalance(id: number) {
    const sumOfTransactions = await db.userTransactions.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            user_id: id
        }
    })

    return sumOfTransactions._sum.amount || 0;
}