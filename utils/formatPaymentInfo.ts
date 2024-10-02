export default function formatPaymentInfo(paymentString: string) {

    // sturipe/merchant_id=325975&transaction_id=cfcb39e0-7958-11ef-a3ec-058de84ca6d3&expires_on=1727060782504&price=5050
    
    const splitByBackSlash = paymentString.split('/');

    const splitByAnd = splitByBackSlash[1]?.split('&');

    let paymentData: any = {};

    splitByAnd?.forEach(data => {
        let value: any;

        const splitData = data.split('=');

        if(splitData[0] !== 'transaction_id') {
            value = Number(splitData[1])
        } else {
            value = splitData[1]
        }

        paymentData[splitData[0]!] = value;
    })

    return paymentData;
}