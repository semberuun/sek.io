import React, { useContext, useEffect, useRef } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import AddSafetyContext from '../Context/AddSafetyContext';
import SafetyAddNumberAndName from '../Components/SafetyAddNumberAndName';
import SafetyAddSelect from '../Components/SafetyAddSelect';
import SafetyAddPDF from '../Components/SafetyAddPDF';


export default function SafetyAdd() {

    useEffect(() => {
        console.log(`AddSafetyPage ажиллаж байна...`);
        return () => {
            clearFunc.current();
        }
    }, []);

    const AddSafetyCtx = useContext(AddSafetyContext);
    const clearFunc = useRef(null);
    clearFunc.current = AddSafetyCtx.clearFunction;

    const onclick = () => {
        AddSafetyCtx.postClick();
    };

    const cancelUploadFile = () => {
        AddSafetyCtx.cancelUpload();
    }

    return (
        <>
            <h1 className=' font-serif font-semibold mt-10 text-blue-500 text-center text-xl mb-10'>Технологийн карт шинээр нэмэх</h1>
            <div className='flex justify-center w-full mb-10'>
                <div className='w-2/3 flex flex-col'>
                    <form>
                        <SafetyAddNumberAndName />
                        <SafetyAddSelect />
                        <SafetyAddPDF />
                    </form>
                </div>
            </div >
            <div className='mb-2 flex flex-col items-center'>
                <button onClick={() => onclick()} className=' uppercase text-yellow-500 font-sans w-full h-full hover:text-yellow-400'>Илгээх</button>
            </div>
            <div className='flex justify-center mb-10 p-2'>
                <div className='w-full p-2 md:w-3/4 lg:w-1/2'>
                    <ProgressBar completed={`${AddSafetyCtx.loaded}`} maxCompleted={100} labelAlignment={'center'} />
                </div>
                <div>
                    {AddSafetyCtx.loaded === 100 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> : <svg onClick={() => cancelUploadFile()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500 cursor-pointer hover:text-red-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>}
                </div>
            </div>
        </>
    )
}
