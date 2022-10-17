import React, { useState } from 'react';
import Menu from './Menu';

export default function MobileMenu() {

    const [open, setOpen] = useState(true);

    return (
        <div className=" flex flex-col items-end pt-4 hover:text-gray-700" onClick={() => { setOpen(prevOpen => !prevOpen) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z" /></svg>
            <div className={open ? "hidden" : null}>
                <Menu />
            </div>
        </div>
    )
}





