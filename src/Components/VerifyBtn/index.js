import React from 'react';

function VerifyBtn(props) {

    const onClick = () => {
        props.verify(false);
    }

    const universal = () => {
        props.universal();
    }

    return (
        <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-60'>
            <div className=' bg-gray-200 rounded-lg shadow-lg w-96 h-52 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='font-main mb-8 text-gray-700'>
                        Та энэ үйлдлийг хийхдээ итгэлтэй байна уу
                    </h1>
                    <div>
                        <button onClick={universal} className=' bg-yellow-500 py-1 px-3 font-main rounded-lg text-white bg-opacity-80 cursor-pointer hover:bg-yellow-500'>Баталгаажуулах</button>
                        <button onClick={onClick} className=' bg-red-500 ml-10 py-1 px-3 font-main rounded-lg text-white bg-opacity-80 cursor-pointer hover:bg-red-500'>Цуцлах</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyBtn