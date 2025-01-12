import { db } from '~/server/db';
import getBalance from './getBalance';

export default async function submitPayment(
    transactionId: string, 
    userId: number, 
    dateSettled: number,
    price: number
) {

    /**
     * 
     * {
            id: number;
            merchant_id: number;
            transaction_id: string;
            price: number;
            expires_on: bigint;
        }
     */
    const pendingTransaction: any = await db.pendingTransactions.findFirst({
        where: {
            transaction_id: transactionId,
        }
    })

    if(!pendingTransaction) {
        return {
            status: 404,
            error: 'TRANSACTION DOES NOT EXIST',
            data: null
        }
    }

    console.log(
        `
        transaction id: ${pendingTransaction.transaction_id}
        merchant: ${pendingTransaction.merchant_id}
        price: ${pendingTransaction.price}
        expiration: ${pendingTransaction.expires_on}
        `
    );

    if(pendingTransaction.expires_on  < dateSettled) {
        return {
            status: 404,
            error: 'TRANSACTION EXPIRED',
            data: null
        }
    }

    try {
        
        const userBalance = await getBalance(userId);

        console.log('Balance: ', userBalance);
        // 1. Check if user has sufficient funds
        if(userBalance < price) {
            throw new Error('INSUFFICIENT FUNDS')
        }

        await db.$transaction(async (tx) => {

            // 2. Add transaction that debits users account
            await tx.userTransactions.create({
                data: {
                    transaction_id: transactionId,
                    amount: (0 - price),
                    user_id: userId,
                    date_settled: dateSettled,
                }
            })

            // 3. Add transaction that credits merchant account
            await tx.merchantTransactions.create({
                data: {
                    transaction_id: transactionId,
                    amount: price,
                    merchant_id: pendingTransaction.merchant_id,
                    date_settled: dateSettled,
                }
            })

            // 4. Delete pending transaction
            await tx.pendingTransactions.delete({
                where: {
                    transaction_id: transactionId,
                }
            })
        })

        return {
            status: 200,
            error: null,
            data: {
                success: true,
            }
        }

    } catch(error: any) {
        return {
            status: 500,
            error: error.message,
            data: null
        }
    }
}