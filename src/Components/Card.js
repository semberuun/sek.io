import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../Context/UserContext';
import CategoryContext from '../Context/CategoryContext';

export default function Card(props) {

    const ctx = useContext(UserContext);
    const CategoryCtx = useContext(CategoryContext);

    const onClick = (id) => {
        CategoryCtx.setVerifyOpen(true);
        CategoryCtx.getCategoryId(id);
    };

    return (
        <>
            <div className='h-80 w-80'>
                <img className='object-fill h-80 w-80' src={`http://localhost:8000/${props.category.photo}`} alt='' />
            </div>
            <div className=' flex flex-row w-80 pt-2 pb-2 border-b border-gray-700'>
                <div className='h-6 w-6 pl-1'>
                    <svg className="text-gray-700 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polygon points="23 7 16 12 23 17 23 7" />  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                </div>
                <h1 className='flex-wrap w-auto text-start font-serif pl-4 text-gray-700 hover: cursor-pointer'>
                    {props.category.name}
                </h1>
            </div>
            <div className='pt-2 pb-2 w-80 items-center text-center '>
                <div className='flex pl-1 pb-2'>
                    <div className='h-6 w-6 '>
                        <svg className=" h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                    </div>
                    <h1 className='pl-2 font-serif text-gray-700'>
                        {props.category.lessonsCount} видео сургалт
                    </h1>
                </div>
                <div className='flex pl-1 mb-3 w-full'>
                    <div className='h-6 w-6 '>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h1 className='pl-2 font-serif text-gray-700'>
                        {props.category.teacherName}
                    </h1>
                </div>
                <div className='flex pl-1 mb-3 w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <h1 className='pl-1 text-gray-700'>{props.category.viewCount} ажилтан үзсэн</h1>
                </div>
                <Link to={'/categories/' + props.category._id}>
                    <div className=' flex justify-center items-center w-full h-10 border-2 rounded-xl shadow-md border-yellow-500 bg-yellow-500 hover: cursor-pointer hover:bg-yellow-400 hover:border-yellow-400 transition-colors duration-300 ease-out'>
                        <button className=' uppercase text-white font-sans'>Үзэх</button>
                    </div>
                </Link>
                {ctx.form.role === 'admin' ?
                    <div onClick={() => onClick(props.category._id)} className=' flex justify-center items-center w-full h-10 mt-4 border-2 rounded-xl shadow-md border-gray-900 bg-gray-900 hover: cursor-pointer hover:bg-gray-700 hover:border-gray-700 transition-colors duration-300 ease-out'>
                        <button className=' uppercase text-white font-sans'>Устгах</button>
                    </div> : null}
            </div>
        </>
    )
}
