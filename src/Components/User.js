import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';

export default function User() {
    const ctx = useContext(UserContext);
    return (
        <div className='flex items-center justify-end'>
            <div>
                <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <div className=' text-gray-300'>
                {ctx.form ? <p>+976 <strong className='text-yellow-400'>{ctx.form.phone}</strong></p> : null}
            </div>
        </div>
    )
}
