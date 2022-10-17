import React, { useContext, useEffect, useRef } from 'react';
import AddNews from './AddNews';
import News from './News';
import img from '../Assets/img/ааааа__1_-removebg-preview.png';
import UserContext from '../Context/UserContext';
import NewsContext from '../Context/NewsContext';
import OpenNews from './OpenNews';

export default function SecondHero() {
    useEffect(() => {
        getNewsFunc.current();
        return () => {
            cleanUpFunc.current();
        }
    }, []);

    const newsCtx = useContext(NewsContext);
    const ctx = useContext(UserContext);

    const getNewsFunc = useRef(null);
    const cleanUpFunc = useRef(null);

    getNewsFunc.current = newsCtx.getNews;
    cleanUpFunc.current = newsCtx.cleanFunc;

    return (
        <div className='w-full mt-60 mb-28 pb-10 h-auto text-white bg-gray-700 md:mt-80 lg:mt-98'>
            {newsCtx.openNews.open ? < OpenNews /> : null}
            <div>
                <h1 className=' pt-8 text-2xl uppercase text-center font-main'>Сургалт болон түүнтэй холбоотой<strong className=' font-semibold text-yellow-500'> мэдээ мэдээлэл</strong></h1>
                <div className='flex mb-10'>
                    <img className='hidden w-96 h-64 mt-10 ml-16 xl:block' src={img} alt='' />
                    <News />
                </div>
                <div className='mb-4'>
                    {ctx.form.role === 'admin' ? <AddNews /> : null}
                </div>
            </div>
        </div>
    )
}
