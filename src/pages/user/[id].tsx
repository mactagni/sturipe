import { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import formatPaymentInfo from 'utils/formatPaymentInfo';
import PaymentPrompt from '~/components/PaymentPromt';

export default function User() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream|null>(null);
    const [paymentInfo, setPaymentInfo] = useState();
    const [hidden, setHidden] = useState(false);

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

                const formatCodeToObject = formatPaymentInfo(code);

                setPaymentInfo(formatCodeToObject);
                console.log(formatCodeToObject)
            },
            {
                returnDetailedScanResult: true,
                preferredCamera: 'user',
                maxScansPerSecond: 1,
                highlightScanRegion: true
            }
        )

        if(paymentInfo) {
            qrScanner.stop();
            console.log('SUCCESSFULLY CAPTURED CODE')
        }

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

    }, [])

    async function submitPaymentPrompt() {

    }

    // useEffect(() => {
    //     qrScanner.stop();

    //     const timeoutId = setTimeout(() => {
    //         setHidden(true);
    //     }, 1000)

    //     return () => {
    //         clearTimeout(timeoutId);
    //     }
    // }, [paymentInfo])

    return (
        <div className='flex justify-center'>
            <div className="p-10 px-30">
                <video ref={videoRef} className="w-80 rounded-lg mb-10 border-double border-2 border-gray-600" autoPlay /> 
            </div>
            <PaymentPrompt
                paymentInfo={paymentInfo}
                hidden={hidden}
                submitPaymentPrompt={submitPaymentPrompt}
            />
        </div>
    )
}