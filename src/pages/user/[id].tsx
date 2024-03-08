import { useRef, useEffect, useState } from 'react';

export default function User() {
    const videoRef = useRef(null);
    const [stream, setStream] = useState<MediaStream|null>(null);

    // useEffect(async () => {
    //     await getPaymentInfo();
    // }, [stream])

    async function getPaymentInfo() {
        const constraints = { 
            audio: false, 
            video: {
                facingMode: { exact: "user" },
            } 
        }

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                setStream(stream);
                const video: any = videoRef.current;
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    video.play();
                }
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`)
            })
    }

    return (
        <div className="p-10 w-100">
            <video className="rounded-lg mb-10 border-double border-2 border-gray-600" ref={videoRef} autoPlay />
            <button onClick={getPaymentInfo} className="py-5 w-full rounded-lg text-center bg-gray-700 hover:bg-gray-600 font-bold">access</button>
        </div>
    )
}