import React, { useState, useRef } from 'react';
import axios from '../axios';
import Axios from 'axios';

const FirstSafetyContext = React.createContext();

const isCheckedInitial = {
    checked1: false, checked2: false, checked3: false, checked4: false, checked5: false, checked6: false, checked7: false, checked8: false
};

const safetyDataState = {
    safety: [],
    spinner: true,
    errorData: null
}

export const FirstSafetyStore = props => {

    const [isChecked, setIsChecked] = useState(isCheckedInitial);
    const [selectName, setSelectName] = useState([]);

    const [safetyData, setSafetyData] = useState(safetyDataState);

    const [searchHandle, setSearchHandle] = useState('');

    const [pagination, setPagination] = useState(null);

    const [verifyOpen, setVerifyOpen] = useState(false);

    const [safetyID, setSafetyID] = useState(null);

    const cleanUpSearchFunc = useRef(null);

    //Цэвэрлэгч функц
    const clearFunction = () => {
        if (cleanUpSearchFunc.current) cleanUpSearchFunc.current();
        setIsChecked(isCheckedInitial);
        setSelectName([]);
        setSafetyData(safetyDataState);
        setSearchHandle('');
        setPagination(null);
        setVerifyOpen(false);
        setSafetyID(null);
    };

    //Бүх картуудыг татаж авах Хайлт хийх
    const getSafeties = (currentPage) => {
        if (cleanUpSearchFunc.current) cleanUpSearchFunc.current();
        setSafetyData({ ...safetyData, spinner: true });
        let config = {
            cancelToken: new Axios.CancelToken(cancel => cleanUpSearchFunc.current = cancel)
        };
        let select = selectName.map(el => {
            return el.value;
        });

        axios.get(`${'/safety?search=' + searchHandle.toLowerCase() + '&select=' + select + '&page=' + currentPage}`, config).then(result => {
            setSafetyData({ ...safetyData, safety: result.data.data, spinner: false, errorData: null });
            setPagination(result.data.pagination);
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('хэрэглэгч харуулахаас өмнө өөр үйлдэл хийлээ....');
            };
            setSafetyData({ ...safetyData, errorData: err, spinner: false });
        })
    };

    const handleChange = (e) => {
        const id = e.target.id;
        const data = e.target.name;
        const value = e.target.value;
        const checkbox = { ...isChecked };
        checkbox[id] = !checkbox[id];
        setIsChecked(checkbox);
        const variable = { data, id, value }
        const array = [...selectName];
        array.push(variable);
        if (!isChecked[e.target.id]) {
            setSelectName(array);
        } else {
            const a = selectName.map(el => {
                return el.id
            });
            const index = a.indexOf(id);
            if (index > -1) {
                const array = [...selectName];
                array.splice(index, 1);
                setSelectName(array);
            }
        }
    };

    const deleteSafety = (id) => {
        setVerifyOpen(true);
        setSafetyID(id);
    };

    const openVerify = () => {
        setVerifyOpen(false);
    };

    //Нэг технологийн карт устгах
    const deletedSafety = () => {
        axios.delete(`/safety/${safetyID}`).then(result => {
            const data = result.data.data._id
            let array = [];
            if (safetyData.safety) {
                safetyData.safety.map(el => {
                    return array.push(el._id);
                });
            };
            const index = array.indexOf(data);
            if (index > -1) {
                safetyData.safety.splice(index, 1);
                setSafetyData({ ...safetyData, safety: [...safetyData.safety] });
            };
            setVerifyOpen(false);
            setSafetyID(null);
        }).catch(err => {
            console.log(err);
            setVerifyOpen(false);
            setSafetyID(null);
        });
    };

    return (
        <FirstSafetyContext.Provider
            value={{
                isChecked,
                safetyData,
                searchHandle,
                pagination,
                selectName,
                verifyOpen,
                setSearchHandle,
                getSafeties,
                handleChange,
                deleteSafety,
                openVerify,
                deletedSafety,
                clearFunction
            }}>
            {props.children}
        </FirstSafetyContext.Provider>
    );
};

export default FirstSafetyContext;



