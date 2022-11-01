import React, { useState, useRef } from 'react';
import axios from '../axios';
import Axios from 'axios';

const NewsContext = React.createContext();

const newsInitialState = {
    news: [],
    spinner: false,
    errorNews: null
};

const writeInitialState = {
    title: '',
    writeNews: '',
    picture: null,
    errorWriteState: null
};

const openNew = {
    open: false,
    new: []
};

export const NewsStore = props => {

    const [newsState, setNewsState] = useState(newsInitialState);

    const [verifyNews, setVerifyNews] = useState(false);

    const [writeState, setWriteState] = useState(writeInitialState);

    const [fileName, setFileName] = useState('');

    const [openNews, setOpenNews] = useState(openNew);

    const token = localStorage.getItem('token');

    const cancelPostFunc = useRef(null);
    const cancelGetFunc = useRef(null);

    const getOneNews = (id) => {
        const oneNews = newsState.news.filter(el => el._id === id);
        setOpenNews({ ...openNews, open: true, new: oneNews });
    };
    const closeNews = () => {
        setOpenNews(openNew);
    };

    // Цэвэрлэгч функц
    const cleanFunc = () => {
        if (cancelPostFunc.current) cancelPostFunc.current();
        if (cancelGetFunc.current) cancelGetFunc.current();
        console.log('NEWSCONTEXT цэвэрлэгч функц ажиллаж байна....');
        setNewsState(newsInitialState);
        setVerifyNews(false);
        setWriteState(writeInitialState);
        setOpenNews(openNew);
    };

    //Нэг зар нэмэх
    const postWriteNews = () => {
        const data = new FormData();
        data.append("name", writeState.title);
        data.append('news', writeState.writeNews);
        data.append('file', writeState.picture);
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            cancelToken: new Axios.CancelToken(cancel => cancelPostFunc.current = cancel)
        };
        axios.post('/news', data, config).then(result => {
            if (result.data.count === 10) {
                newsState.news.splice(8, 1);
            };
            setNewsState({ ...newsState, news: [result.data.data, ...newsState.news] });
            setWriteState({ ...writeState, title: '', writeNews: '', picture: null });
            setFileName('');
            setVerifyNews(false);
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('NEWS context Цуцаллаа...');
            };
            setWriteState({ ...writeState, errorWriteState: err });
            setFileName('');
            setVerifyNews(false);
        });
    };

    //Бүх заруудыг авах
    const getNews = () => {
        setNewsState({ ...newsState, spinner: true });
        axios.get('/news', { cancelToken: new Axios.CancelToken(cancel => cancelGetFunc.current = cancel) }).then(result => {
            setNewsState({ ...newsState, news: result.data.data, spinner: false });
        }).catch(err => setNewsState({ ...newsState, errorNews: err }));
    };

    const addTitle = (title) => {
        setWriteState({ ...writeState, title });
    };

    const addNews = (writeNews) => {
        setWriteState({ ...writeState, writeNews });
    };

    const addPicture = (pic) => {
        setWriteState({ ...writeState, picture: pic });
    };

    return (
        <NewsContext.Provider
            value={{
                newsState,
                writeState,
                verifyNews,
                fileName,
                openNews,
                getOneNews,
                closeNews,
                setVerifyNews,
                postWriteNews,
                getNews,
                addTitle,
                addNews,
                addPicture,
                setFileName,
                cleanFunc
            }}>
            {props.children}
        </NewsContext.Provider>
    );
};

export default NewsContext;



