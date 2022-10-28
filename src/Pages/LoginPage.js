import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import IMG from "../Assets/img/logo.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginForm from '../Components/LoginForm';
import { SpinnerCircular } from 'spinners-react';
import UserContext from '../Context/UserContext';

const schema = yup
    .object()
    .shape({
        phone: yup.string().required().min(8).max(8),
        password: yup.string().required().min(4),
    });

export default function LoginPage() {

    const ctx = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        ctx.handleLogedIn(data);
    };

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            {ctx.form.spinner ?
                <div className='rounded-md w-3/4 text-gray-500 md:w-2/4 lg:w-1/4 bg-white p-10'>
                    <div className='flex justify-start items-center w-full h-auto mb-6'>
                        <div className='h-12 w-12'>
                            <img src={IMG} alt='login' />
                        </div>
                        <p className='pl-10'>ДСЦТС ХК</p>
                    </div>
                    {ctx.form.error ? <p className=' text-red-500 text-xs text-center'>{ctx.form.error}</p> : null}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {LoginForm.inputs.map((input, key) => {
                            return (
                                <div className='flex flex-col mb-8' key={key} >
                                    <label className="mb-2 uppercase font-semibold font-main">{input.label}</label>
                                    <input className="border rounded p-1 focus:outline-none w-full " name={input.name} type={input.type}
                                        {...register(input.name, { required: true })} />
                                    <p className='text-red-500 text-xs'>{errors[input.name]?.message}</p>
                                </div>
                            )
                        })}
                        <button className='bg-yellow-600 mb-4  w-full py-2 text-white uppercase rounded-md hover:bg-yellow-500 shadow-lg'
                            type='submit' >
                            Нэвтрэх
                        </button>
                    </form>
                    <div>
                        <Link to="/signin">
                            <button disabled={ctx.register} className=' mb-4  w-full py-2 text-yellow-600 uppercase hover:text-yellow-400 '>
                                Бүртгүүлэх
                            </button>
                        </Link>
                    </div>
                </div>
                : <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(253, 216, 53, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" />}
        </div>
    )
}




