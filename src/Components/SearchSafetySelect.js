import React, { useContext, useEffect, useRef } from 'react';
import FirstSafetyContext from '../Context/FirstSafetyContext';

export default function SearchSafetySelect() {

    const FirstSafetyCtx = useContext(FirstSafetyContext);
    useEffect(() => {
        searchSelect.current();
    }, [FirstSafetyCtx.selectName]);

    const searchSelect = useRef(null);
    searchSelect.current = FirstSafetyCtx.getSafeties;

    const form = [
        {
            name: "Агаарын шугам",
            id: "checked1",
            checked: FirstSafetyCtx.isChecked.checked1,
            value: 'airline'
        },
        {
            name: 'Кабел шугам, туршилт',
            id: "checked2",
            checked: FirstSafetyCtx.isChecked.checked2,
            value: 'kabelline'
        },
        {
            name: 'Хоёрдогч хэлхээ, хэмжих хэрэгсэл',
            id: "checked3",
            checked: FirstSafetyCtx.isChecked.checked3,
            value: 'measurement'
        },
        {
            name: 'Дэд станц, хуваарилах байгууламж',
            id: "checked4",
            checked: FirstSafetyCtx.isChecked.checked4,
            value: 'station'
        },
    ];

    return (
        <>
            {form.map((el, index) => {
                return (
                    <div key={index + 1} className="flex items-center mb-4 ml-8">
                        <input onChange={(e) => FirstSafetyCtx.handleChange(e)} name={el.name} id={el.id} checked={el.checked} type="checkbox" value={el.value} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ml-2 text-sm font-medium text-blue-500 dark:text-gray-300">{el.name}</label>
                    </div>
                )
            })}
        </>
    )
}
