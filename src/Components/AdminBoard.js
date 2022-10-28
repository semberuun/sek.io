import React from 'react';
import Profile from '../Assets/img/Profile.JPG';

function AdminBoard() {

    return (
        <div className='  bg-gray-800 mb-10 pb-10 w-full md:w-2/6 md:h-auto 2xl:w-1/6'>
            <h1 className=' text-yellow-500 font-serif font-semibold text-center text-5xl m-5 border-b-2 border-gray-400'>Админ</h1>
            <div className='flex items-center justify-center mb-4'>
                <div className=' relative w-12 h-12 rounded-full m-2 '>
                    <img className='absolute object-fill w-12 h-12 rounded-full' alt='profile' src={Profile} />
                </div>
                <p className=' text-gray-400 m-4'>Ж.Сэмбэрүүн</p>
            </div>
            <h1 className=' text-gray-400 text-center font-main mb-10'>ХТЛА-Электроникийн инженер</h1>
        </div>
    )
}

export default AdminBoard