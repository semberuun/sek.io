import React from 'react'

export default function BottomBar() {
    return (
        <footer className=' bottom-0 flex flex-col justify-center pl-5 h-48 w-full bg-gray-900 mb-8 md:pl-20 xl:pl-56'>
            <div className='flex flex-row pb-5'>
                <svg className="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                <div className='text-white pl-5 text-sm'>
                    Холбоо барих
                </div>
            </div>
            <div className='flex flex-row pb-5 '>
                <svg className="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                <div className=' text-white pl-5 text-sm'>
                    Утас : 99175200
                </div>
            </div>
            <div className='flex flex-row pb-5'>
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="2" />  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></svg>
                <div className=' text-white pl-5 text-sm'>
                    Онлайн сургалтын онцлог
                </div>
                <div className='hidden lg:flex lg:flex-row lg:pl-96 lg:justify-center lg:items-center'>
                    <div className=' text-sm text-white'>
                        Бүх эрх хуулиар хамгаалагдсан
                    </div>
                    <svg className="h-4 w-4 text-white pl-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <path d="M14.5 9a3.5 4 0 1 0 0 6" /></svg>
                    <div className='text-white text-sm pl-1'>
                        {new Date().getFullYear()} он
                    </div>
                </div>
            </div>
        </footer>
    )
}
