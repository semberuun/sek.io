import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SigninForm from '../Components/SigninForm';
import UserContext from '../Context/UserContext'

const schema = yup
    .object()
    .shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        phone: yup.string().required().min(8).max(8),
        email: yup.string().required().email(),
        password1: yup.string().required().min(4),
        password2: yup.string().required().min(4).oneOf([yup.ref('password1'), null], 'Нууц үг буруу байна'),
    });

export default function SigninPage() {

    const ctx = useContext(UserContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const value = {
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            password: data.password1
        };
        ctx.handleRegister(value);
        navigate('/login');
    }

    return (
        <div className='h-auto w-screen flex flex-col justify-center items-center mt-10 mb-10'>
            <div className='bg-white rounded-md w-full text-gray-500 md:w-2/3 lg:w-1/3'>
                <h1 className='uppercase mt-4  text-yellow-600 text-center text-2xl font-semibold mb-6'>Бүртгүүлэх</h1>
                <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
                    {SigninForm.inputs.map((input, key) => {
                        return (
                            <div className='flex flex-col mb-6 w-2/3' key={key}>
                                <label className=' mb-1'>{input.label}</label>
                                <input className=' border rounded p-1 focus:outline-none w-full ' type={input.type} name={input.name}
                                    {...register(input.name, { required: true })} />
                                <p className='text-red-500'>{errors[input.name]?.message}</p>
                            </div>
                        )
                    })}
                    <button type='submit' className='bg-yellow-600 mb-4  w-2/3 py-2 text-white uppercase rounded-md hover:bg-yellow-500 shadow-lg'>Бүртгүүлэх</button>
                </form>
            </div>
        </div>
    )
}


