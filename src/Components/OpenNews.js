import React, { useContext } from 'react';
import NewsContext from '../Context/NewsContext';

export default function OpenNews() {

    const NewsCtx = useContext(NewsContext);

    const onclick = () => {
        NewsCtx.closeNews();
    };

    return (
        <div className=' fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-60'>
            <div className='bg-gray-100 rounded-lg shadow-lg w-2/3 h-auto z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <div className='flex w-full justify-between p-4 rounded-lg bg-gray-200'>
                    <div className=' text-blue-500 font-sans uppercase text-base mr-4'>
                        <h1>{NewsCtx.openNews.new[0].name}</h1>
                    </div>
                    <div className='w-6 h-6'>
                        <svg onClick={() => onclick()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className=' w-full h-80 overflow-y-scroll'>
                    <p className=' p-4 text-xs text-gray-800'>{NewsCtx.openNews.new[0].news}</p>
                </div>
            </div>
        </div>
    )
}
