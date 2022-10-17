import React from 'react'

function Presentation() {
    return (
        <div className='w-full h-auto mb-28 xl:flex'>
            <div className=' flex pl-8 pt-8'>
                <div className=' w-1/4 pt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                </div>
                <div className='w-2/3 p-2'>
                    <h1 className=' font-main font-medium text-xl'>Зөвхөн Видео болон Аудио</h1>
                    <p className=' text-sm'>Бүх сургалт нь 3-30 минутын урттай видео хэлбэрээр хүргэгдэнэ. Мянга уншсанаас нэг үзсэн нь дээр. Таны цаг завыг супер хэмнэх болно гэдгийг амлая.</p>
                </div>
            </div>
            <div className=' flex pl-8 pt-8'>
                <div className=' w-1/4 pt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                </div>
                <div className='w-2/3 p-2'>
                    <h1 className=' font-main font-medium text-xl'>Цагаа хэмнэнэ</h1>
                    <p className=' text-sm'>Та хүссэн цагтаа суралцах боломжтой. Ажлаа тараад эсвэл цайны цагаар, чөлөөт цагаараа та мэргэжлээ дээшлүүлэх, шинэ зүйлд суралцах боломжтой боллоо.</p>
                </div>
            </div>
            <div className=' flex pl-8 pt-8'>
                <div className=' w-1/4 pt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div className='w-2/3 p-2'>
                    <h1 className=' font-main font-medium text-xl'>Практик сургалт</h1>
                    <p className=' text-sm'>Бидний видео сургалтууд нь онол биш харин асуудлыг бодитоор хэрхэн шийдвэрлэж байгааг нүдэн дээр харуулж явах тул та практик дээр бодит мэргэжилтнүүдээс суралцана.</p>
                </div>
            </div>
            <div className=' flex pl-8 pt-8 pb-8'>
                <div className=' w-1/4 pt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                </div>
                <div className='w-2/3 p-2'>
                    <h1 className=' font-main font-medium text-xl'>Насан туршийн сургалт</h1>
                    <p className=' text-sm'>Та худалдан авсан сургалтаа насан туршдаа хэдэн ч удаа үзэж болно. Өөрөөр хэлбэл та насан туршийн оюуны хөрөнгөтэй болох юм.</p>
                </div>
            </div>
        </div>
    )
}

export default Presentation