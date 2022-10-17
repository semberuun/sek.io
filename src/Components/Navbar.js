import React from 'react';
import IMG from '../Assets/img/logo.png';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    return (
        <div className=" flex flex-wrap justify-between bg-white bg-opacity-50 w-full pt-2 pb-1 md:h-20 ">
            <div className="pl-10 text-black-500 cursor-pointer lg:pl-24 xl:pl-24 2xl:pl-52">
                <div className="h-16 w-16">
                    <img src={IMG} alt='Logo' />
                </div>
            </div>
            <div className="hidden md:flex md:pr-4 lg:mr-24 xl:mr-14 2xl:pr-32 ">
                <DesktopMenu />
            </div>
            <div className=' pr-14 z-10 text-xl font-main md:hidden'>
                <MobileMenu />
            </div>
        </div>
    )
}
