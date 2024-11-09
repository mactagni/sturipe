import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import QRCode from 'qrcode';
import { v1 as uuidv1 } from 'uuid';
import PaymentTerminal from "~/components/PaymentTerminal";
import { PageToggleContext } from "./_app";

export default function Home() {

  const [price, setPrice] = useState('');
  const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'SUBMIT']
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [qrCodePrice, setQRCodePrice] = useState('');
  const [expiration, setExpiration] = useState('');
  const [merchant, setMerchant] = useState(325975);
  const displayTransactions = useContext(PageToggleContext);

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
    const expiresIn = timeStamp + 600000;
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
        <PaymentTerminal 
          numberKeys={numberKeys}
          price={price}
          qrCodeUrl={qrCodeUrl}
          qrCodePrice={qrCodePrice}
          expiration={expiration}
          clearPrice={clearPrice}
          generateQrCode={generateQrCode}
          addNumber={addNumber}
        />
      </main>
    </>
  );
}
