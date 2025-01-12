import { NextApiRequest, NextApiResponse } from 'next';
import getTransactions from 'utils/getTransactions';
import { Transaction } from 'utils/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const accountId = Number(req.query.id);
    const { isUserAccount } = req.body;
    console.log(`id: ${accountId}, isUserAccount: ${isUserAccount}`)
    
    let transactions: any = await getTransactions(isUserAccount, accountId);


    if(!transactions) {
        res.status(400).json({ error: 'NO TRANSACTIONS' })
        
        return
    }

    res.status(200).json(transactions);
}