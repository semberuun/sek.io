import React from 'react';
import User from './User';

export default function Topbar() {
    return (
        <div className="flex items-center justify-between inset-0 in  h-16 w-full bg-gray-900 text-white md:pl-10 lg:pl-20 2xl:pl-40">
            <div className="mr-10 hidden md:flex text-gray-500 cursor-pointer hover:text-yellow-500 transition-colors duration-700 ease-out text-xs lg:text-sm font-semibold">
                <a href="http://www.dsedn.mn">
                    "Дархан Сэлэнгийн цахилгаан түгээх сүлжээ ХК"
                </a>
            </div>
            <div className='w-full md:w-1/2 mr-8 md:mr-10 lg:mr-28 xl:mr-24 2xl:mr-52'>
                <User />
            </div>
        </div>
    )
}
