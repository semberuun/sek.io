import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';
import NewsContext from '../Context/NewsContext';
import VerifyBtn from './VerifyBtn';

function AddNews() {

    const ctx = useContext(UserContext);
    const NewsCtx = useContext(NewsContext);

    const changeName = (e) => {
        e.preventDefault();
        const data = e.target.value;
        NewsCtx.addTitle(data);
    };

    const changeNews = (e) => {
        e.preventDefault();
        const data = e.target.value;
        NewsCtx.addNews(data);
    };

    const onclick = () => {
        NewsCtx.setVerifyNews(true);
    };

    const fileUpload = (e) => {
        e.preventDefault();
        const data = e.target.files[0];
        if (data) {
            NewsCtx.setFileName(data.name);
            NewsCtx.addPicture(data);
        } else NewsCtx.setFileName('');
    };

    return (
        <>
            {NewsCtx.verifyNews ? <VerifyBtn verify={NewsCtx.setVerifyNews} universal={NewsCtx.postWriteNews} /> : null}
            {ctx.form.role ?
                < div className=' flex flex-col items-center justify-center xl:flex-row xl:ml-8' >
                    <div className=' w-3/4'>
                        <input onChange={changeName} value={NewsCtx.writeState.title} placeholder="Гарчиг оруулна уу" className='mb-4 w-full pl-2 bg-gray-200 py-1 border-none rounded-lg text-gray-800 shadow-lg text-sm focus:outline-none' />
                        <textarea onChange={changeNews} value={NewsCtx.writeState.writeNews} placeholder='Нийтлэлээ оруулна уу...' className='mb-4 w-full pl-2 bg-gray-200 h-48 border-none rounded-lg text-gray-800 shadow-lg text-sm focus:outline-none' />
                    </div>
                    <div className='w-2/3 flex flex-col justify-center items-center'>
                        <div className='mb-5'>
                            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:border-blue-500 hover:bg-blue-500 hover:text-white">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                {NewsCtx.fileName ? <p className=' text-xs text-center'>{NewsCtx.fileName}</p> :
                                    <span className="mt-2 text-base leading-normal">Файл оруулна уу</span>}
                                <input onChange={fileUpload} type='file' className="hidden" />
                            </label>
                        </div>
                        <button onClick={onclick} disabled={(NewsCtx.writeState.title === '' || NewsCtx.writeState.picture === null || NewsCtx.writeState.writeNews === '' ? true : false)} className={` w-full py-2 rounded-lg text-white uppercase sm:w-1/2 ${(NewsCtx.writeState.title === '' || NewsCtx.writeState.writeNews === '' || NewsCtx.writeState.picture === null ? 'bg-gray-300 border-gray-300' : 'bg-yellow-500 cursor-pointer hover:bg-yellow-400 ')}`}>Илгээх</button>
                    </div>
                </div > : null}
        </>
    )
}

export default AddNews