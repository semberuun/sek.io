import React, { useContext, useEffect, useRef } from 'react';
import AdminContext from '../Context/AdminContext';

export default function SearchUsers() {
    const AdminCtx = useContext(AdminContext);

    useEffect(() => {
        searchFunc.current();
    }, [AdminCtx.search]);


    const searchFunc = useRef(null);
    searchFunc.current = AdminCtx.getUsers;

    const searchPhone = (e) => {
        const data = e.target.value;
        AdminCtx.setSearch(data);
    };


    return (
        <div className=' flex items-center w-full mb-4 md:w-2/3'>
            <input onChange={searchPhone} className=' rounded-sm ml-4 p-1 w-2/3 bg-gray-50 text-black border-b-2 border-yellow-400 border-collapse focus:outline-none' placeholder='Хэрэглэгчийн утасны дугаараар хайх' />
        </div>
    )
}
