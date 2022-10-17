import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import FirstSafetyContext from '../Context/FirstSafetyContext';
import UserContext from '../Context/UserContext';
import VerifyBtn from './VerifyBtn';


export default function SafetyCard() {

    useEffect(() => {
        useFunc.current();
        console.log('FirstSafetyPage функц ажиллаж байна...');
        return () => {
            useClearFunc.current();
            console.log('FirstSafetyPage цэвэрлэгч функц ажиллаж байна...');
        };
    }, []);

    const ctx = useContext(UserContext);
    const FirstSafetyCtx = useContext(FirstSafetyContext);
    const useFunc = useRef(null);
    const useClearFunc = useRef(null);
    useClearFunc.current = FirstSafetyCtx.clearFunction;
    useFunc.current = FirstSafetyCtx.getSafeties;

    const deleteClick = (id) => {
        FirstSafetyCtx.deleteSafety(id);
    };

    return (
        <>
            {FirstSafetyCtx.verifyOpen ? <VerifyBtn verify={FirstSafetyCtx.openVerify} universal={FirstSafetyCtx.deletedSafety} /> : null}
            {FirstSafetyCtx.safetyData.spinner ?
                <div className='flex items-center justify-center h-screen'>
                    <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(253, 216, 53, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" /> </div> :
                <div className=' w-4/5 h-auto'>
                    {FirstSafetyCtx.safetyData.safety.map(el => {
                        return (
                            <div key={el._id} className=' flex w-full'>
                                <Link to={`/firstsafety/${el._id}`} className='w-11/12'>
                                    <div className=' font-sans text-gray-700 border-collapse border rounded-xl border-yellow-500 mb-4 p-1 pl-10 transform hover:text-white hover:bg-yellow-500 hover:cursor-pointer hover:scale-105 duration-200'>
                                        <p>{el.cardnumber}</p>
                                        <p>{el.cardname}</p>
                                    </div>
                                </Link>
                                {ctx.form.role === 'admin' ?
                                    <div className=' w-1/12 flex justify-center items-center cursor-pointer'>
                                        <svg onClick={() => deleteClick(el._id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div> : null
                                }
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}



