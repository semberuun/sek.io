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

export const AdminStore = props => {

    const [userState, setUserState] = useState(usersInitialState);
    const [pagination, setPagination] = useState(null);
    const [search, setSearch] = useState('');

    //Баталгаажуулалт state
    const [verifyOpen, setVerifyOpen] = useState(false);

    const cleanUpSearchFunc = useRef(null);

    const clearFunc = () => {
        setUserState(usersInitialState);
        setPagination(null);
        setSearch('');
        setVerifyOpen(false);
        if (cleanUpSearchFunc.current) cleanUpSearchFunc.current();
    };


    const getUsers = (currentPage) => {
        setUserState({ ...userState, spinner: true });
        if (cleanUpSearchFunc.current) cleanUpSearchFunc.current();
        const token = localStorage.getItem('token');
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

    const deletedUser = () => {
        setVerifyOpen(false);
        const token = localStorage.getItem('token');
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

    return (
        <AdminContext.Provider
            value={{
                userState,
                pagination,
                search,
                verifyOpen,
                getUsers,
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

