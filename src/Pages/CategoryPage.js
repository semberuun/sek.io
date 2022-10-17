import React, { useContext, useState, useEffect, useRef } from 'react';
import { SpinnerCircular } from 'spinners-react';
import ReactPaginate from 'react-paginate';
import Card from '../Components/Card';
import UserContext from '../Context/UserContext';
import CategoryContext from '../Context/CategoryContext';
import AddCategory from '../Components/AddCategory';
import VerifyBtn from '../Components/VerifyBtn';

export default function CategoryPage() {

    useEffect(() => {
        console.log('Category Page ajillaj bn');
        CategoriesFunc.current();
        return () => {
            console.log('Category Page Цэвэрлэгч функц ажиллаж байна');
            cleanerFunc.current();
        }
    }, []);

    const [open, setOpen] = useState(false);

    const ctx = useContext(UserContext);
    const CategoryCtx = useContext(CategoryContext);

    const CategoriesFunc = useRef();
    const cleanerFunc = useRef();

    cleanerFunc.current = CategoryCtx.clearFunc;

    CategoriesFunc.current = CategoryCtx.getCategories;

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        CategoryCtx.getCategories(currentPage);
    };

    const openAdd = (e) => {
        e.preventDefault();
        setOpen(prevOpen => !prevOpen);
        CategoryCtx.setLoaded(0);
    };

    return (
        <>
            {CategoryCtx.verifyOpen ? <VerifyBtn verify={CategoryCtx.setVerifyOpen} universal={CategoryCtx.deleteCategory} /> : null}
            {CategoryCtx.categories.spinner ?
                <div className='flex items-center justify-center h-screen'>
                    <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(253, 216, 53, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" /> </div>
                :
                <div className=' flex flex-col justify-center items-center mt-20 mb-20 md:flex md:flex-row md:flex-wrap md:items-start'>
                    {CategoryCtx.categories.categories.map(el => {
                        return <div key={el._id} className=' flex flex-col flex-wrap w-96 h-auto mb-8 text-gray-700 items-center transform hover: cursor-pointer hover:scale-105 duration-200 '> <Card category={el} /></div>
                    })}
                    {ctx.form.role === 'admin' ?
                        <div className=' flex flex-col items-center w-96 h-auto mb-8  '>
                            <div onClick={(e) => openAdd(e)} className=' flex items-center justify-center w-80 h-80 border-2 border-yellow-500 transform hover: cursor-pointer hover:scale-105 duration-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            {open ? <AddCategory /> : null}
                        </div>
                        : null}
                </div >
            }
            <ReactPaginate
                breakLavel="***"
                previousLabel='<<'
                nextLabel='>>'
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                pageCount={CategoryCtx.pagination ? CategoryCtx.pagination.totalPage : 1}
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
}
