import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroBtn() {

    const navigate = useNavigate()

    return (
        <div className='absolute top-1/4 ml-2 md:ml-10 md:top-1/3 lg:top-1/2 lg:ml-20 2xl:ml-44'>
            <h1 className=' text-2xl mb-6 text-gray-800 font-main md:text-4xl lg:text-5xl'> Гэрлийн хурдаар хөгжлийг <strong className='text-yellow-500'>ДЭМЖИНЭ</strong></h1>
            <button onClick={() => navigate('/categories')} className='bg-yellow-500 py-1 px-3 font-main rounded-lg text-white bg-opacity-60 cursor-pointer hover:bg-yellow-500'>
                Энд дарна уу...
            </button>
        </div>
    )
}

export default HeroBtn