import React, { useContext } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

import LessonContext from '../Context/LessonContext';
import VerifyBtn from './VerifyBtn';

import { useParams } from 'react-router-dom';

export default function AddLesson() {

    const LessonCtx = useContext(LessonContext);

    const CategoryID = useParams();

    const onChange = (e) => {
        e.preventDefault();
        const data = e.target.value;
        LessonCtx.lessonName(data);
    }

    const fileUploadVideo = (e) => {
        const data = e.target.files[0];
        if (data) {
            LessonCtx.setFileName(data.name);
            LessonCtx.lessonFile(data);
        } else LessonCtx.setFileName('');

    };

    const onClick = () => {
        LessonCtx.verifyAddLesson(true);
    };


    const postLesson = () => {
        LessonCtx.postAddLesson(CategoryID.id);
    };

    const cancelUpload = () => {
        LessonCtx.fileCancelUpload();
    };

    return (
        <div className='mt-10'>
            {LessonCtx.addLesson.verifyOpen ? <VerifyBtn verify={LessonCtx.verifyAddLesson} universal={postLesson} /> : null}
            <h1 className='mb-4 uppercase text-yellow-500 font-serif'><strong>Хичээл нэмэх</strong></h1>
            <div className="flex w-full justify-start bg-grey-lighter mb-4">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    {LessonCtx.fileName ? <p className=' text-xs text-center'>{LessonCtx.fileName}</p> :
                        <span className="mt-2 text-base leading-normal">Файл оруулна уу</span>}
                    <input onChange={fileUploadVideo} type='file' className="hidden" name="video" />
                </label>
            </div>
            <input onChange={onChange} placeholder='Хичээлийн нэрийг оруулна уу' className='border mb-4 rounded p-1 focus:outline-none w-3/4' type='text' name="lessonName" value={LessonCtx.addLesson.name || ''} />
            <div className={` flex justify-center items-center w-1/2 h-10 mt-4 border-2 rounded-xl shadow-md  ${(LessonCtx.addLesson.name === '' || LessonCtx.addLesson.video === null) ? 'bg-gray-300 border-gray-300' : 'bg-yellow-500 border-yellow-500 hover: cursor-pointer hover:bg-yellow-400 hover:border-yellow-400 transition-colors duration-300 ease-out'} `}>
                <button disabled={(LessonCtx.addLesson.name === '' || LessonCtx.addLesson.video === null) ? true : false} onClick={() => onClick()} className=' uppercase text-white font-sans w-full h-full'>Илгээх</button>
            </div>
            <div className='flex items-center mt-6'>
                <div className=' w-4/5 mr-4'>
                    <ProgressBar completed={`${LessonCtx.loaded}`} maxCompleted={100} labelAlignment={'center'} />
                </div>
                <div className=''>
                    {LessonCtx.loaded === 100 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> : <svg onClick={() => cancelUpload()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500 cursor-pointer hover:text-red-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    }
                </div>
            </div>
        </div>
    )
}

