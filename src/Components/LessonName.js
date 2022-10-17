import React, { useContext } from 'react';
import LessonContext from '../Context/LessonContext';

export default function LessonName() {
    const LessonCtx = useContext(LessonContext);
    return (
        <>
            {LessonCtx.lessonState.lesson === null ? <div className=' pb-4 border-b border-gray-400 uppercase'>Хичээлийн нэр</div> : <h1 className=' pb-4 border-b border-gray-400'>{LessonCtx.lessonState.lesson[0].name}</h1>}
        </>
    )
}
