interface AppProps {
    numberKeys: string [];
    price: string;
    qrCodeUrl: string;
    qrCodePrice: string;
    expiration: string;
    clearPrice: any;
    generateQrCode: any;
    addNumber: any;
}

export default function PaymentTerminal(
    {
        numberKeys,
        price,
        qrCodeUrl,
        qrCodePrice,
        expiration,
        clearPrice,
        generateQrCode,
        addNumber,
    }: AppProps
) {
    return (
        <div>
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
        </div>
    )
}