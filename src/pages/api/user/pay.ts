import { NextApiRequest, NextApiResponse } from 'next';
import submitPayment from 'utils/submitPayment';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { transactionId, price, settled, userId } = req.body;

    if(!transactionId) {
        res.status(404).json({
            error: 'INVALID ID',
            data: null
        })

        return
    }

    const { status, data, error } = await submitPayment(
        transactionId,
        userId,
        settled,
        price,
    );
    
    res.status(status).json({ error, data });
}