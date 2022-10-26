import React, { useContext } from 'react';
import AdminContext from '../Context/AdminContext';

export default function OpenUser() {

    const AdminCtx = useContext(AdminContext);

    const closeOnclick = () => {
        AdminCtx.closeUser();
    };

    const rightClick = () => {
        AdminCtx.putRight();
    };

    return (
        <div className=' fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-60'>
            <div className='bg-gray-100 rounded-lg shadow-lg w-2/3 h-auto z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <div className='flex w-full justify-between p-4 rounded-lg bg-gray-200'>
                    <div className=' text-blue-600 font-semibold font-sans uppercase text-base mr-4'>
                        {AdminCtx.userOpen.user[0].phone}
                    </div>
                    <div className='w-6 h-6'>
                        <svg onClick={() => closeOnclick()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className=' w-full h-98 p-6 overflow-y-scroll xl:flex'>
                    <div className=' w-full h-auto mt-4 xl:w-2/3 '>
                        <h1 className=' font-serif text-blue-600 mb-6'>Хэрэглэгчийн мэдээлэл</h1>
                        <div>Овог : {AdminCtx.userOpen.user[0].lastname}</div>
                        <div>Нэр : {AdminCtx.userOpen.user[0].firstname}</div>
                        <div>Имайл : {AdminCtx.userOpen.user[0].email}</div>
                        <div>Хэрэглэгч : {AdminCtx.userOpen.user[0].role}</div>
                        <div className='flex'>Эрх : {AdminCtx.userOpen.user[0].right ? <p className=' text-yellow-500'>идэвхтэй</p> : <p className=' text-red-500'>идэвхгүй</p>}</div>
                        <p>Үзсэн хичээлүүд :</p>
                        {AdminCtx.userOpen.user[0].views.map((el, index) => {
                            return (
                                <div key={index + 1} className=' m-4 pb-3 text-blue-700  border-b border-gray-400'>{el.name}</div>
                            )
                        })}
                    </div>
                    <div className=' w-full h-auto xl:w-1/3 xl:ml-6'>
                        <div className='w-full'>
                            <button onClick={() => rightClick()} className='mt-20 " inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"'>{AdminCtx.userOpen.user[0].right ? "Хэрэглэгчийн эрхийг идэвхгүй болгох" : "Хэрэглэгчийн эрхийг идэвхтэй болгох"}</button>
                        </div>
                        <p className='mt-10 mb-4 font-serif font-semibold text-gray-600 '>Хэрэглэгчийн нууц үг солих :</p>
                        <div className='w-full'>
                            <input className=' w-full bg-gray-100 border mb-6 rounded p-1 focus:outline-none' type='password' name='password' placeholder='Шинэ нууц үг оруулна уу...' />
                            <button className=' w-1/2 mt-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"'>илгээх</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
