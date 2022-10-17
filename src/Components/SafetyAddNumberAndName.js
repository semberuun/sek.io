import React, { useContext } from 'react';
import AddSafetyContext from '../Context/AddSafetyContext';

export default function SafetyAddNumberAndName() {

    const AddSafetyCtx = useContext(AddSafetyContext);

    return (
        <div className='text-center mb-10'>
            <label className='text-blue-500'>Технологийн картын дугаар</label>
            <input onChange={e => AddSafetyCtx.changeNumber(e)} value={AddSafetyCtx.cardNumber} type='text' name='cardNumber' className=' text-xs border rounded p-2 mt-4 mb-4 focus:outline-none w-full' />
            <label className='text-blue-500'>Технологийн картын нэр</label>
            <input onChange={e => AddSafetyCtx.changeName(e)} value={AddSafetyCtx.cardName} type='text' name='cardName' className=' text-xs border rounded p-2 mt-4 focus:outline-none w-full' />
        </div>
    )
}