import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import formatPaymentInfo from 'utils/formatPaymentInfo';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const qrCode = req.body.data;

    if(!qrCode) {
        res.status(400).json({
            error: 'INVALID CODE',
            data: null
        })
        return
    }

    const { merchant_id, transaction_id, price, expires_on } = formatPaymentInfo(qrCode);
    
    const pendingTransaction = await db.pendingTransactions.create({
        data: {
            merchant_id,
            transaction_id,
            price,
            expires_on
        }
    })

    if(!pendingTransaction) {
        res.status(400).json({ 
            error: 'ERROR: DATABASE ACCESS',
            data: null
        })
    }

    res.status(200).json({ 
        success: 'SUCCESS: DB UPDATED',
        data: {
            qrCode,
            paymentInfo: formatPaymentInfo(qrCode),
        }
    })
}