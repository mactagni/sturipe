export default function PaymentPrompt({ 
    paymentInfo, 
    hidden, 
    submitPaymentPrompt 
}: any) {
    
    const price = 0 ?? paymentInfo.price;
    const transactionId = 0 ?? paymentInfo['transaction_id'];

    const styles = hidden ? 'hidden' : '';


    async function handlePayClick() {
        await submitPaymentPrompt(transactionId, true);
    }

    async function handleCancelClick() {
        await submitPaymentPrompt(transactionId, false);
    }

    return (
        <dialog className={styles}>
            <div>{ price }</div>
            <div>
                <button onClick={handlePayClick}>PAY</button>
                <button onClick={handleCancelClick}>CANCEL</button>
            </div>
        </dialog>
    )
}