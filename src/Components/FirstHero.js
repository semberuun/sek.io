import React from 'react'
import Wallpaper from '../Assets/img/photo.jpg';
import WallpaperVideo from '../Assets/video/video.mp4';

export default function FirstHero() {
    return (
        <div className='w-full -z-10 absolute top-16'>
            <div className=' relative w-full h-80 pt-16 overflow-hidden md:h-96 lg:h-100'>
                <div className='absolute top-0 left-0 w-full h-full md:hidden'>
                    <img src={Wallpaper} className='object-cover object-center w-full h-full' alt='' />
                </div>
                <div className='absolute hidden top-0 left-0 w-full h-full md:block'>
                    <video className='object-cover object-center w-full h-auto' src={WallpaperVideo} autoPlay loop muted />
                </div>
            </div>
        </div>
    )
}
