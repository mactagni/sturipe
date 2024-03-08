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

  function submitPrice() {
    generateQrCode();
  }

  function generateQrCode() {
    const expiresIn = Date.now() + 300;

    let data = `sturipe/m_id=325975&p_id=${uuidv1()}&exp=${expiresIn}&price=${price}`

    console.log(data);
    
    QRCode.toDataURL(data, (err, url) => {
      if(err) throw err

      setQRCodeUrl(url);
    })

    let expiration = String(expiresIn);
    
    setQRCodePrice(price);
    setExpiration(expiration);
    setPrice('');
  }

  return (
    <>
      <Head>
        <title>Sturipe</title>
        <meta name="sturipe" content="Meh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="place-content-center mt-10 mx-40 flex bg-gray-800 text-white font-arial font-bold">
        <div className="flex-1 items-center">
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
        <div className="flex-1">
          <img className="rounded-lg" src={qrCodeUrl} alt="" />
          <br />
          <br />
          <p className="text-neutral-600">amount: {qrCodePrice}</p>
          <p className="text-neutral-600">expires: {expiration}</p>
        </div>
      </main>
    </>
  );
}
