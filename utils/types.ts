type T = any;

export type Transaction = {
    merchant_id?: number;
    user_id?: number;
    amount: number;
    date_settled: number;
    transaction_id: string;
}

export type PaymentInfo = {
    merchant_id: number;
    transaction_id: string;
    expires_on: number;
    price: number;
}

export type SubmitPaymentPrompt = (
    timeSubmitted?: number,
    userChoice?: boolean
) => Promise<T>