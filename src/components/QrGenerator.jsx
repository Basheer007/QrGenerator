import React, { useState } from 'react'

const QrGenerator = () => {


    const [qrData, setqrData] = useState('Basheer');
    const [qrSize, setQrSize] = useState(150);
    const [img, setImg] = useState('');
    async function GenerateQr() {
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
            setImg(url)
        } catch (error) {
            console.log(error)
        }
    }

    async function downloadQr() {
        try {
            const imgurl = await fetch(img);
            const blob = await imgurl.blob()
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'QrCode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        } catch (error) {
            if (error) {
                alert(`error occured`)
                console.log(error)
            }

        }
    }

    return (
        <main className='bg-gradient-to-br from-emerald-900 to-slate-600 min-h-screen flex items-center justify-center'>

            <div className='border-2 border-white py-4 px-2 rounded-xl'>
                <h1 className='text-white text-2xl font-outfit text-center'>Qr Generator</h1>

                <div className='flex justify-center w-full p-2'>
                    <img src={img} />
                </div>
                <div className='flex flex-col p-2'>
                    <input type="text"
                        onChange={(e) => setqrData(e.target.value)}
                        value={qrData}
                        className='focus:bg-green-500 outline-none px-2 rounded-md font-outfit' />
                    <label
                        className='text-white font-outfit'
                        htmlFor="data">Entering data will convert Qr</label>
                </div>
                <div className='flex flex-col p-2'>
                    <input type="text"
                        onChange={(e) => setQrSize(e.target.value)}
                        value={qrSize}
                        className='focus:bg-green-500 outline-none px-2 rounded-md font-outfit' />
                    <label
                        className='text-white font-outfit'
                        htmlFor="data">Enter size of Qr e.g(150X150)</label>
                </div>

                <div className='flex gap-3'>



                    <div>

                        <button onClick={GenerateQr}
                            className='bg-emerald-500 px-2 py-1 rounded-lg font-outfit hover:shadow-md hover:shadow-green-700 active:scale-95'>Generate Qr</button>
                    </div>
                    <div>

                        <button

                            onClick={downloadQr}
                            className='bg-red-500 px-2 py-1 rounded-lg font-outfit hover:shadow-md hover:shadow-red-700 active:scale-95'>Download Qr</button>
                    </div>

                </div>
            </div>

        </main>
    )
}

export default QrGenerator
