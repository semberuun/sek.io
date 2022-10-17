import React, { useContext } from 'react';
import LessonContext from '../Context/LessonContext';

export default function LessonTeacher() {

    const LessonCtx = useContext(LessonContext);

    return (
        <div className='md:flex pt-3 border-b border-gray-400 pb-4 text-blue-600'>
            <div className='flex items-center'>
                <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className='pl-1'>{LessonCtx.name ? LessonCtx.name : null}</h1>
            </div>
        </div>
    )
}
