import React, { useState, useRef } from 'react';
import axios from '../axios';
import Axios from 'axios';

const AdminContext = React.createContext();

const usersInitialState = {
    users: [],
    spinner: false,
    errorUsers: null,
    deleteUserID: null,
    userCount: 0,
    sumLessons: 0,
    sumCategory: 0
};

const userOpenState = {
    open: false,
    user: []
}

export const AdminStore = props => {

    const [userState, setUserState] = useState(usersInitialState);
    const [pagination, setPagination] = useState(null);
    const [search, setSearch] = useState('');
    const [userOpen, setUserOpen] = useState(userOpenState);

    //Баталгаажуулалт state
    const [verifyOpen, setVerifyOpen] = useState(false);

    const cleanUpSearchFunc = useRef(null);

    const token = localStorage.getItem('token');

    // Цэвэрлэгч функц
    const clearFunc = () => {
        setUserState(usersInitialState);
        setPagination(null);
        setSearch('');
        setVerifyOpen(false);
        if (cleanUpSearchFunc.current) cleanUpSearchFunc.current();
    };

    const getRegister = () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios.put('/register', config).then(result => console.log(result)).catch(err => console.log(err));
    };

    // Бүх хэрэглэгчийг татах
    const getUsers = (currentPage) => {
        setUserState({ ...userState, spinner: true });
        if (cleanUpSearchFunc.current) cleanUpSearchFunc.current();
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            cancelToken: new Axios.CancelToken(cancel => cleanUpSearchFunc.current = cancel)
        };

        axios.get(`${'/user?search=' + search + '&page=' + currentPage}`, config).then(result => {
            setUserState({ ...userState, users: result.data.data.users, userCount: result.data.data.userCount, sumCategory: result.data.data.sumCategory, sumLessons: result.data.data.sumLessons, spinner: false });
            setPagination(result.data.pagination);
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('AdminContext search stopped...');
            }
            setUserState({ ...userState, errorUsers: err, spinner: false })
        });
    };

    const deleteUser = (id) => {
        setVerifyOpen(true);
        setUserState({ ...userState, deleteUserID: id });
    };

    // Нэг хэрэглэгчийг устгах
    const deletedUser = () => {
        setVerifyOpen(false);
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios.delete(`/user/${userState.deleteUserID}`, config).then(result => {
            const data = result.data.data._id;
            let array = [];
            if (userState.users) {
                userState.users.map(el => {
                    return array.push(el._id);
                });
            };
            const index = array.indexOf(data);
            if (index > -1) {
                userState.users.splice(index, 1);
                setUserState({ ...userState, users: [...userState.users] });
            };
        }).catch(err => setUserState({ ...userState, errorUsers: err }));
    };

    // Нэг хэрэглэгчийг авах
    const getUser = (id) => {
        const oneUser = userState.users.filter(el => el._id === id);
        setUserOpen({ ...userOpen, open: true, user: oneUser });
    };

    // Хэрэглэгчийн эрхийг нээх хаах
    const putRight = () => {
        axios.put(`/user/${userOpen.user[0]._id}/right`).then(result => {
            userOpen.user[0].right = result.data.data;
            setUserOpen({ ...userOpen, user: userOpen.user });
        }).catch(err => console.log(err));
    };

    const closeUser = () => {
        setUserOpen(userOpenState);
    };

    return (
        <AdminContext.Provider
            value={{
                userState,
                pagination,
                search,
                verifyOpen,
                userOpen,
                putRight,
                closeUser,
                getRegister,
                getUsers,
                getUser,
                setSearch,
                setVerifyOpen,
                deleteUser,
                deletedUser,
                clearFunc
            }}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContext;

