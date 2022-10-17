import React, { useContext } from 'react';
import AdminContext from '../Context/AdminContext';
import UserGrafic from './UserGrafic';
import UserTable from './UserTable';
import SearchUsers from './UserSearch';


function AdminDashboard() {

    const AdminCtx = useContext(AdminContext);

    return (
        <div className='w-full md:w-4/6 mt-10 2xl:ml-10 2xl:w-5/6 '>
            <h1 className=' mb-4 font-main text-gray-500 font-bold text-2xl pl-4'>Хяналтын самбар</h1>
            <div className=' 2xl:flex'>
                <div className='flex justify-center mb-2 2xl:mr-1'>
                    <div className=' flex items-center justify-between w-96 bg-yellow-400 h-36  rounded-lg '>
                        <p className=' text-gray-700 ml-4 font-mono'>Хэрэглэгчид</p>
                        <h1 className=' text-gray-700 text-5xl font-main font-bold'>{AdminCtx.userState.userCount}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                    </div>
                </div>
                <div className='flex justify-center mb-2 2xl:mr-1'>
                    <div className='flex items-center justify-between w-96 bg-pink-400 h-36 rounded-lg'>
                        <p className=' text-gray-700 ml-4 font-mono'>Хичээлүүд</p>
                        <h1 className=' text-white text-5xl font-main font-bold'>{AdminCtx.userState.sumLessons}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                    </div>
                </div>
                <div className=' flex justify-center mb-2'>
                    <div className='flex items-center justify-between w-96 bg-blue-400 h-36 rounded-lg'>
                        <p className=' text-gray-700 ml-4 font-mono'>Категори</p>
                        <h1 className=' text-white text-5xl font-main font-bold'>{AdminCtx.userState.sumCategory}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <h1 className=' mt-4 font-main text-gray-500 font-bold text-2xl pl-4'>График самбар</h1>
            <UserGrafic />
            <h1 className=' mt-4 font-main text-gray-500 font-bold text-2xl pl-4 mb-4'>Хэрэглэгчийн самбар</h1>
            <SearchUsers />
            <div className='overflow-x-auto relative'>
                <UserTable />
            </div>
        </div >
    )
}

export default AdminDashboard
