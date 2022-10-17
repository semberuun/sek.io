import React, { useState, useRef } from 'react';
import axios from '../axios';
import Axios from 'axios';

const AddSafetyContext = React.createContext();

export const AddSafetyStore = props => {

    const cancelFileUpload = useRef(null);

    const [cardNumber, setCardNumber] = useState('');

    const [cardName, setCardName] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    const [pdf, setPdf] = useState(null);

    const [loaded, setLoaded] = useState(0);

    const [fileName, setFileName] = useState('');

    const [errorAddSafety, setErrorAddSafety] = useState(null);

    const clearFunction = () => {
        if (cancelFileUpload.current) cancelFileUpload.current();
        console.log(`AddSafetyPage цэвэрлэгч функц ажиллаж байна`);
        setCardNumber('');
        setCardName('');
        setSelectedOption(null);
        setPdf(null);
        setLoaded(0);
        setFileName('');
        setErrorAddSafety(null);
    };

    const changeNumber = (e) => {
        setLoaded(0);
        const data = e.target.value;
        setCardNumber(data);
    };

    const changeName = (e) => {
        setLoaded(0);
        const data = e.target.value;
        setCardName(data);
    };

    const postClick = () => {
        const data = new FormData();
        data.append('file', pdf);
        data.append('cardnumber', cardNumber);
        data.append('cardname', cardName);
        data.append('selectedoption', selectedOption);
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: ProgressEvent => {
                const dataLoading = Math.round((ProgressEvent.loaded / ProgressEvent.total * 100));
                setLoaded(dataLoading);
            },
            cancelToken: new Axios.CancelToken(cancel => cancelFileUpload.current = cancel)
        };
        axios.post('/safety', data, config).then(result => {
            setCardNumber('');
            setCardName('');
            setSelectedOption(null);
            setPdf(null);
            setFileName('');
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('хэрэглэгч хуулахаас өмнө өөр үйлдэл хийлээ....');
            };
            setErrorAddSafety(err);
            setFileName('');
            setCardNumber('');
            setCardName('');
            setSelectedOption(null);
            setPdf(null);
        });
    };

    //Хэрэглэгч хуулж байгаа FILE зогсоох функц
    const cancelUpload = () => {
        if (cancelFileUpload.current) cancelFileUpload.current();
        setCardNumber('');
        setCardName('');
        setSelectedOption(null);
        setPdf(null);
        setLoaded(0);
        setFileName('');
        setErrorAddSafety(null);
    };

    return (
        <AddSafetyContext.Provider
            value={{
                selectedOption,
                cardNumber,
                cardName,
                loaded,
                fileName,
                errorAddSafety,
                cancelUpload,
                changeNumber,
                changeName,
                setSelectedOption,
                setPdf,
                postClick,
                clearFunction,
                setFileName
            }}>
            {props.children}
        </AddSafetyContext.Provider>
    );
};

export default AddSafetyContext;


