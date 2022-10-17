import React, { useContext, useEffect, useRef } from 'react';
import FirstSafetyContext from '../Context/FirstSafetyContext';

export default function SearchFirstSafety() {

    const FirstSafetyCtx = useContext(FirstSafetyContext);

    useEffect(() => {
        search.current();
    }, [FirstSafetyCtx.searchHandle]);

    const search = useRef(null);
    search.current = FirstSafetyCtx.getSafeties;

    return (
        <div className=' flex items-center w-full mb-4 md:w-1/2'>
            <input onChange={e => FirstSafetyCtx.setSearchHandle(e.target.value)} className=' rounded-sm ml-4 p-1 w-2/3 text-gray-600 border-b-2 border-yellow-400 border-collapse focus:outline-none' placeholder='Технологийн картын нэрээр хайх' />
        </div>
    )
};