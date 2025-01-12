import { useRef, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import QrScanner from 'qr-scanner';
import formatPaymentInfo from 'utils/formatPaymentInfo';
import PaymentPrompt from '~/components/PaymentPrompt';
import { PageToggleContext } from '../_app';
import Transactions from '~/components/Transactions';
import { PaymentInfo, SubmitPaymentPrompt } from 'utils/types';


export default function User() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream|null>(null);
    const [paymentInfo, setPaymentInfo]: any = useState({});
    const [hidden, setHidden] = useState(true);
    const router = useRouter();
    const displayTransactions = useContext(PageToggleContext);

    useEffect(() => {
        const video: HTMLVideoElement | null = videoRef.current;
        
        const constraints = { 
            audio: false, 
            video: {
                facingMode: { exact: "user" },
            } 
        }

        const qrScanner = new QrScanner(
            video!,
            result => {
                const code = result.data;

                if(!code.includes('sturipe/')) return;

                const formatCodeToObject: PaymentInfo = formatPaymentInfo(code);

                // setPaymentInfo(formatCodeToObject);
                // console.log(formatCodeToObject)

                return handleQRCodeScanned(formatCodeToObject);
            },
            {
                returnDetailedScanResult: true,
                preferredCamera: 'user',
                maxScansPerSecond: 1,
                highlightScanRegion: true
            }
        )

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                setStream(stream)
                video!.srcObject = stream;
                qrScanner.start();
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`)
            })

        return () => {
            if(qrScanner) {
                qrScanner.stop();
            }
        }

    }, [])

    function handleQRCodeScanned(data: PaymentInfo) {
        if(!data) {
            console.log('NO DATA');
            return;
        }
        console.log('QR Code detected: ', data);
        
        setPaymentInfo(data);

        setTimeout(() => {
            setHidden(false);
        }, 2000)
    }

    async function submitPaymentPrompt(timeSubmitted = 0, userChoice = false) {
        if(!userChoice) {
            setHidden(true);
            return;
        }

        const data = { 
            transactindId: paymentInfo.transaction_id,
            price: paymentInfo.price,
            userId: Number(router.query.id),
            date_settled: timeSubmitted
        }

        const options = {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        }

        console.log(data);

        try {
            const response = await fetch('/api/user/pay', options);
        
            if(!response.ok) {
                const error = new Error();
                error.cause = response.json();

                throw error;
            }
            const jsonResponse = response.json();
            return
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
                displayTransactions === true
                ? <Transactions isUserAccount={true} />
                : (
                    <div className='flex justify-center'>
                        <div className="p-10 px-30">
                            <video 
                                ref={videoRef} 
                                className="w-80 rounded-lg mb-10 border-double border-2 border-gray-600" 
                                autoPlay 
                            /> 
                        </div>
                        <PaymentPrompt
                            paymentInfo={paymentInfo}
                            hidden={hidden}
                            submitPaymentPrompt={submitPaymentPrompt}
                        />
                    </div>
                )
            }
        </>
    )
}