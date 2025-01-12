import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';

const transactions = [
  {
    user_id: 485963,
    amount: 2575,
    date_settled: 1720227809282,
    transaction_id: "515e8a88-2dd1-4671-8233-df366e13afd5"
  },
  {
    user_id: 485963,
    amount: 4930,
    date_settled: 1727174946629,
    transaction_id: "71ffc4d2-905e-46ee-84cc-e4d5a1a871bb"
  },
  {
    user_id: 485963,
    amount: 872,
    date_settled: 1726706726177,
    transaction_id: "3fea80a2-4f57-4542-90ce-1c0d2ea779d8"
  },
  {
    user_id: 485963,
    amount: 937,
    date_settled: 1722765485557,
    transaction_id: "3edbb899-349f-4e63-9863-64ff10397c03"
  },
  {
    user_id: 485963,
    amount: -3503,
    date_settled: 1724776257445,
    transaction_id: "86d29757-aef8-4a1d-bd5e-aef2b916027f"
  },
  {
    user_id: 485963,
    amount: 7890,
    date_settled: 1728047985510,
    transaction_id: "5e17e09c-f90d-48db-8d2f-5dab9089bae7"
  },
  {
    user_id: 485963,
    amount: 3095,
    date_settled: 1722171762250,
    transaction_id: "2aa83ef3-bdb9-46de-858e-4216222c2b85"
  },
  {
    user_id: 485963,
    amount: -5464,
    date_settled: 1723133225401,
    transaction_id: "3e214aa2-957f-4c5f-be76-4bc1beb09c32"
  },
  {
    user_id: 485963,
    amount: -2170,
    date_settled: 1721147203771,
    transaction_id: "68cc5536-55b6-4f93-b3e1-09fd164d2981"
  },
  {
    user_id: 485963,
    amount: -973,
    date_settled: 1720047942469,
    transaction_id: "2f09050c-c149-45ae-91fa-64a5879ca074"
  }
];
  
  
export default async function handler( 
  req: NextApiRequest,
  res: NextApiResponse 
) {
    const dbTransactions = await db.userTransactions.createMany({
      data: transactions,
    })

    if(!dbTransactions) {
      res.status(400).json({
        error: 'ERROR CREATING TRANSACTIONS',
        data: null
      })

      return
    }

    res.status(200).json({
      data: 'TEST PASSED!'
    })
}