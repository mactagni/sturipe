export default function PaymentPrompt({ 
    paymentInfo, 
    hidden, 
    submitPaymentPrompt 
}: any) {
    
    let price = 0;
    let transactionId = '';

    if(paymentInfo) {
        price = paymentInfo['price'];
        transactionId = paymentInfo['transaction_id'];
    }

    async function handlePayClick() {
        const timeSubmitted = Date.now();
        await submitPaymentPrompt(timeSubmitted, true);
    }

    async function handleCancelClick() {
        await submitPaymentPrompt();
    }

    return (
        <div className={hidden ? 'hidden' : 'fixed py-6 bg-gray-900 w-3/5 rounded-xl flex flex-col justify-center text-center drop-shadow-2xl'}>
            <div className="font-bold text-5xl mb-4 text-gray-500">{ price }</div>
            <div>
                <div>
                    <button className="rounded w-4/5 mb-4 p-3 bg-gray-700 hover:bg-green-700 font-bold" onClick={handlePayClick}>PAY</button>
                </div>
                <div>
                    <button className="rounded w-4/5 mb-2 p-3 bg-gray-800 hover:bg-red-800 font-bold" onClick={handleCancelClick}>CANCEL</button>
                </div>
            </div>
        </div>
    )
}