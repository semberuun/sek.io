import React, { useContext } from 'react';
import Select from 'react-select';
import AddSafetyContext from '../Context/AddSafetyContext';

const options = [
    { value: 'airline', label: 'Агаарын шугам' },
    { value: 'kabelline', label: 'Кабел шугам, туршилт' },
    { value: 'measurement', label: 'Хоёрдогч хэлхээ, хэмжих хэрэгсэл' },
    { value: 'station', label: 'Дэд станц, хуваарилах байгууламж' },
];

export default function SafetyAddSelect() {

    const AddSafetyCtx = useContext(AddSafetyContext);

    return (
        <div className='mb-10'>
            <Select
                defaultValue={AddSafetyCtx.selectedOption}
                onChange={e => AddSafetyCtx.setSelectedOption(e.value)}
                options={options}
                placeholder='Сонгоно уу...'
                className=' text-xs'
            />
        </div>
    )
}
