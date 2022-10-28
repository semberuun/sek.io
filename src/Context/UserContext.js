import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const UserContext = React.createContext();

const initialState = {
    email: null,
    firstname: null,
    lastname: null,
    phone: null,
    role: null,
    right: null,
    userId: null,
    views: [],
    spinner: true,
    error: null
};

export const UserStore = props => {

    const [form, setForm] = useState(initialState);

    //Нэвтэрсэн эсэх
    const [user, setUser] = useState(false);

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    //Хэрэглэгч нэвтрэх
    const handleLogedIn = async (data) => {
        // spinner ажиллуулж эхэлнэ
        setForm({ ...form, spinner: false });
        // хэрэглэгч логин хийж state.д хадгална
        axios.post('user/login', data).then(result => {
            const token = result.data.token;
            localStorage.setItem('token', token);
            setUser(true);
            setForm({
                ...form,
                email: result.data.data.email,
                firstname: result.data.data.firstname,
                lastname: result.data.data.lastname,
                phone: result.data.data.phone,
                role: result.data.data.role,
                right: result.data.data.right,
                userId: result.data.data._id,
                views: result.data.data.views,
                spinner: false
            });
            navigate('/');
        }).catch(err => {
            setForm({ ...form, error: err.response.data.error.message, spinner: true });
        });
    };

    //Хэрэглэгч бүртгүүлэх
    const handleRegister = (data) => {
        axios.post('user/register', data).then(result => {
            console.log(result);
        }).catch(err => console.log(err));
    };

    //Хэрэглэгч гарах
    const handleLogout = () => {
        localStorage.removeItem('token');
        setForm(initialState);
        setUser(false);
    };

    // шинээр ачааллах
    const refreshUser = (config) => {
        axios.get(`/user/refresh`, config).then(result => {
            setForm({
                ...form,
                email: result.data.data.email,
                firstname: result.data.data.firstname,
                lastname: result.data.data.lastname,
                phone: result.data.data.phone,
                role: result.data.data.role,
                right: result.data.data.right,
                userId: result.data.data._id,
                views: result.data.data.views
            });
        }).catch(err => {
            setForm({ ...form, error: err.response.data.error.message });
        });
        setUser(true);
    };

    //хэрэглэгчийн үзсэн хичээлийг хадгалах
    const lessonRegister = (data, lessonId, lessonName) => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        const array = form.views;
        const variable = array.filter(el => el.id === lessonId);
        if (variable.length === 0) {
            const viewLesson = {
                id: lessonId,
                name: lessonName
            };
            array.push(viewLesson);
            setForm({ ...form, views: array });
            axios.put(`/user/${form.userId}`, data, config).then(result => {
                console.log(result.data);
            }).catch(err => console.log(err));
        };
    };

    return (
        <UserContext.Provider
            value={{
                form,
                user,
                handleRegister,
                handleLogout,
                handleLogedIn,
                refreshUser,
                lessonRegister
            }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
