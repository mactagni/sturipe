import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { v1 as uuidv1 } from 'uuid';

export default function Home() {

  const [price, setPrice] = useState('');
  const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'SUBMIT']
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [qrCodePrice, setQRCodePrice] = useState('');
  const [expiration, setExpiration] = useState('');

  function addNumber(e: any) {
    let number = e.target.value;
    
    let newPrice = price + number;
    setPrice(newPrice);
  }

  useEffect(() => {
    function handleKeyDown(e: any) {
      const pressedKey = e.key;
  
      if(/[0-9]/.test(pressedKey)) {
        let newPrice = price + pressedKey;
        setPrice(newPrice);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  })

  function clearPrice() {
    setPrice('');
  }

  async function generateQrCode() {
    if(price === '') return

    const timeStamp = Date.now();
    const expiresIn = timeStamp + 300;
    // console.log(timeStamp)
    // console.log(expiresIn)

    let data = `sturipe/merchant_id=325975&transaction_id=${uuidv1()}&expires_on=${expiresIn}&price=${price}`

    // console.log(data);

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ data })
    }

    const response = await fetch('/api/merchant/create-payment', options)
    const jsonResponse = await response.json();

    console.log(jsonResponse);

    if(jsonResponse.data) {
      QRCode.toDataURL(data, (err, url) => {
        if(err) throw err

        setQRCodeUrl(url);
      })

      let expiration = timeStampToLocaleTime(expiresIn);
      
      setQRCodePrice(price);
      setExpiration(expiration);
      setPrice('');
    }
  }

  function timeStampToLocaleTime(stamp: number): string {
    const timeStamp = new Date(stamp);
    const localTime = timeStamp.toLocaleTimeString();

    return localTime;
  }

  return (
    <>
      <Head>
        <title>Sturipe</title>
        <meta name="sturipe" content="Meh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="place-content-center mt-10 mx-10 md:flex-row flex-col bg-gray-800 text-white font-arial font-bold md:mx-40">
        <div className="flex-none mb-8 items-center">
          <div>
            <div>
              <p className="min-h-10 text-right px-20">{price}</p>            
            </div>
            <div className="grid gap-4 grid-cols-3 grid-rows-3">
              {
                numberKeys.map((button, index) => {
                  if(button === 'CLEAR') return <button key={button+'-'+index} className="rounded p-3 hover:bg-red-500" onClick={clearPrice}>{button}</button>
                  if(button === 'SUBMIT') return <button key={button+'-'+index} className="rounded p-3 hover:bg-blue-500" onClick={generateQrCode}>{button}</button>

                  return <button key={button+'-'+index} className="rounded p-3 hover:bg-gray-600" onClick={addNumber} value={button}>{button}</button>
                })
              }
            </div>
          </div>
        </div>
        <div className="flex-1 text-sm grid place-content-center">
          <img className="rounded-lg" src={qrCodeUrl} alt="" />
          <br />
          <p className="text-neutral-600">amount: {qrCodePrice}</p>
          <p className="text-neutral-600">expires: {expiration}</p>
        </div>
      </main>
    </>
  );
}
