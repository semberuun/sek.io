import React, { useContext } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

import CategoryContext from '../Context/CategoryContext';

export default function AddCategory() {
    const CategoryCtx = useContext(CategoryContext);

    const onChange = (e) => {
        e.preventDefault();
        const data = e.target.value;
        CategoryCtx.addCategoryName(data);
    }

    const fileUpload = (e) => {
        e.preventDefault();
        const data = e.target.files[0];
        CategoryCtx.addCategoryFile(data);
    };

    const teacherName = (e) => {
        e.preventDefault();
        const data = e.target.value;
        CategoryCtx.addCategoryTeacher(data);
    };

    const onClick = () => {
        CategoryCtx.addCategory();
    };

    const cancelUploadFile = () => {
        CategoryCtx.cancelUpload();
    };

    return (
        <div className=' w-80 mt-6'>
            <div className=' flex pb-7'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input onChange={fileUpload} className='pl-2' type='file' name="photo" />
            </div>
            <input onChange={onChange} placeholder='Категори нэрийг оруулна уу' className='border mb-6 rounded p-1 focus:outline-none w-full' type='text' name="categoryName" value={CategoryCtx.addCategories.name} />
            <input onChange={teacherName} placeholder='Багшийн нэрийг оруулна уу' className='border mb-6 rounded p-1 focus:outline-none w-full' type='text' name="teacherName" value={CategoryCtx.addCategories.teacher} />
            <div onClick={onClick} className={`flex justify-center items-center w-full h-10 border-2 rounded-xl shadow-md ${(CategoryCtx.addCategories.nam === '' || CategoryCtx.addCategories.file === null || CategoryCtx.addCategories.teacher === '') ? 'bg-gray-300 border-gray-300' : 'border-yellow-500 bg-yellow-500 hover: cursor-pointer hover:bg-yellow-400 hover:border-yellow-400 transition-colors duration-300 ease-out'}`}>
                <button disabled={(CategoryCtx.addCategories.name === '' || CategoryCtx.addCategories.file === null || CategoryCtx.addCategories.teacher === '') ? true : false} className=' uppercase text-white font-sans w-full h-full'>Илгээх</button>
            </div>
            <div className='flex items-center mt-6'>
                <div className='w-4/5 mr-4'>
                    <ProgressBar completed={`${CategoryCtx.loaded}`} maxCompleted={100} labelAlignment={'center'} />
                </div>
                <div>
                    {CategoryCtx.loaded === 100 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> : <svg onClick={() => cancelUploadFile()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500 cursor-pointer hover:text-red-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>}
                </div>
            </div>
        </div>
    )
}
