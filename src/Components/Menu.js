import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemMenu from './ItemMenu';
import UserContext from '../Context/UserContext';

export default function Menu() {

    const ctx = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        ctx.handleLogout();
        navigate('/login');
    };

    return (
        <ul className=" flex flex-col py-10 md:flex md:flex-row md:py-0">
            <ItemMenu link='/'>Нүүр</ItemMenu>
            <ItemMenu link='/categories'>Категори</ItemMenu>
            <ItemMenu link='/firstsafety'>Стандарт</ItemMenu>
            {ctx.form.role === 'admin' ? <ItemMenu link='/admin'>Админ</ItemMenu> : null}
            <ItemMenu link='/test'>
                Тест
                <p className=' text-xs border rounded-md border-red-500 text-red-700 text-center'>coming soon</p>
            </ItemMenu>
            {ctx.user === false ?
                <ItemMenu link='/login'>Нэвтрэх</ItemMenu>
                :
                <div onClick={logout}>
                    <ItemMenu link='/logout'>Гарах</ItemMenu>
                </div>
            }
        </ul>
    )
}
