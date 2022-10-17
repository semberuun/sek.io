import React, { useContext, useEffect, useRef } from 'react';
import { SpinnerCircular } from 'spinners-react';
import ReactPaginate from 'react-paginate';
import AdminContext from '../Context/AdminContext';
import UserContext from '../Context/UserContext';
import VerifyBtn from './VerifyBtn';


export default function UserTable() {
    useEffect(() => {
        getUsers.current();
        return () => cleanUpFunc.current();
    }, []);

    const AdminCtx = useContext(AdminContext);
    const ctx = useContext(UserContext);

    const getUsers = useRef(null);
    const cleanUpFunc = useRef(null);

    cleanUpFunc.current = AdminCtx.clearFunc;
    getUsers.current = AdminCtx.getUsers;

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        AdminCtx.getUsers(currentPage);
    };

    const deleteClick = (id) => {
        AdminCtx.deleteUser(id);
    };

    return (
        <>
            {AdminCtx.verifyOpen && < VerifyBtn verify={AdminCtx.setVerifyOpen} universal={AdminCtx.deletedUser} />}
            <div className='flex justify-center items-center mb-6 ml-56 sm:ml-1 md:ml-24 lg:ml-0'>
                {AdminCtx.userState.spinner ? <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(253, 216, 53, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" /> :
                    <table className='w-full text-sm text-left text-gray-500 bg-red-200'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                            <tr>
                                <th className='py-3 px-6'>
                                    Нэр
                                </th>
                                <th className='py-3 px-6'>
                                    Утас
                                </th>
                                <th className='py-3 px-6'>
                                    и-майл
                                </th>
                                <th className='py-3 px-6'>
                                    Үзсэн хичээл
                                </th>
                                <th className='py-3 px-6'>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {AdminCtx.userState.users ? AdminCtx.userState.users.map(el => {
                                return (
                                    <tr key={el._id} className="bg-gray-50 ">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                                            {el.firstname}
                                        </th>
                                        <td className="py-4 px-6">
                                            {el.phone}
                                        </td>
                                        <td className="py-4 px-6">
                                            {el.email}
                                        </td>
                                        <td className="py-4 px-6">
                                            Үзсэн хичээлүүд
                                        </td>
                                        <td className="py-4 px-6">
                                            {
                                                ctx.form.role === 'admin' ?
                                                    <div onClick={() => deleteClick(el._id)} className='cursor-pointer'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div> : null
                                            }
                                        </td>
                                    </tr >
                                )
                            }) : null}
                        </tbody >
                    </table >
                }
            </div>
            <ReactPaginate
                breakLavel="***"
                previousLabel='<<'
                nextLabel='>>'
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                pageCount={AdminCtx.pagination ? AdminCtx.pagination.totalPage : 1}
                pageClassName='p-1 px-2 m-1 border-2 border-yellow-500 rounded-lg text-gray-800 hover:cursor-pointer hover:bg-yellow-500  hover:scale-105 duration-200'
                previousClassName='p-1 m-1 border-2 border-yellow-500 rounded-lg text-gray-800 hover:cursor-pointer hover:bg-yellow-500  hover:scale-105 duration-200'
                nextClassName='p-1 m-1 border-2 border-yellow-500 rounded-lg text-gray-800 hover:cursor-pointer hover:bg-yellow-500  hover:scale-105 duration-200'
                breakClassName='p-2 border-2 border-yellow-500 rounded-lg text-gray-800 '
                activeClassName={'bg-yellow-500'}
                containerClassName={'flex items-center justify-center mb-4'}
                onPageChange={handlePageClick}
                disabledClassName={'disabled:opacity-75"'}
            />
        </>
    )
};
