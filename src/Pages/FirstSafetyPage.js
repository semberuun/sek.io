import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import SearchFirstSafety from '../Components/SearchFirstSafety';
import SearchSafetySelect from '../Components/SearchSafetySelect';
import { Link } from 'react-router-dom';
import SafetyCard from '../Components/SafetyCard';
import UserContext from '../Context/UserContext';
import FirstSafetyContext from '../Context/FirstSafetyContext';

export default function FirstSafety() {

    const ctx = useContext(UserContext);
    const FirstSafetyCtx = useContext(FirstSafetyContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        FirstSafetyCtx.getSafeties(currentPage);
    };

    return (
        <>
            <div className='lg:flex mt-10 lg:ml-32'>
                <SearchFirstSafety />
                {ctx.form.role === 'admin' ?
                    <Link to={'/firstsafety/addsafety'}>
                        <div className=' flex justify-center px-4 items-center ml-4 w-1/2 lg:w-full h-10 border-2 rounded-xl shadow-md border-yellow-500 bg-yellow-500 hover: cursor-pointer hover:bg-yellow-400 hover:border-yellow-400 transition-colors duration-300 ease-out'>
                            <button className=' uppercase text-white font-sans'>шинээр нэмэх</button>
                        </div>
                    </Link>
                    : null}
            </div>
            <div className=' mt-10 mb-6 mr-10 lg:flex lg:ml-28'>
                <SearchSafetySelect />
            </div>
            <div className=' w-full h-auto flex justify-center mb-10'>
                <SafetyCard />
            </div>
            <div>
                <ReactPaginate
                    breakLavel="***"
                    previousLabel='<<'
                    nextLabel='>>'
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    pageCount={FirstSafetyCtx.pagination ? FirstSafetyCtx.pagination.totalPage : 1}
                    pageClassName='p-1 px-2 m-1 border-2 border-yellow-500 rounded-lg text-gray-800 hover:cursor-pointer hover:bg-yellow-500  hover:scale-105 duration-200'
                    previousClassName='p-1 m-1 border-2 border-yellow-500 rounded-lg text-gray-800 hover:cursor-pointer hover:bg-yellow-500  hover:scale-105 duration-200'
                    nextClassName='p-1 m-1 border-2 border-yellow-500 rounded-lg text-gray-800 hover:cursor-pointer hover:bg-yellow-500  hover:scale-105 duration-200'
                    breakClassName='p-2 border-2 border-yellow-500 rounded-lg text-gray-800 '
                    activeClassName={'bg-yellow-500'}
                    containerClassName={'flex items-center justify-center mb-4'}
                    onPageChange={handlePageClick}
                    disabledClassName={'disabled:opacity-75"'}
                />
            </div>
        </>
    )
}

