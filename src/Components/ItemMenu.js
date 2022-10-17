import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ItemMenu(props) {
    const active = 'text-yellow-500';
    const unactive = '';
    return (
        <li className="py-4 font-serif cursor-pointer hover:text-yellow-500 transition-colors duration-700 ease-out md:px-6">
            <NavLink className={({ isActive }) => (isActive ? active : unactive)} to={props.link} >
                {props.children}
            </NavLink>
        </li>
    )
}