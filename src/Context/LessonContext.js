import React, { useState, useRef } from "react";
import axios from '../axios';
import Axios from 'axios';

const LessonContext = React.createContext();

const initialState = {
    lessons: [],
    lessonID: null,
    lesson: null,
    verifyOpen: false,
    spinner: false,
    errorLessons: null
};

const addLessonState = {
    name: '',
    video: null,
    verifyOpen: false,
    btnDisebled: true,
    errorAddLesson: null
}

const writeComment = {
    comments: [],
    writeComments: '',
    verifyOpen: false,
    spinner: false,
    errorComments: null
};

export const LessonStore = props => {

    const cancelFileUpload = useRef(null);
    const cancelGetLessons = useRef(null);
    const cancelGetComments = useRef(null);
    const cancelPostComment = useRef(null);

    //хичээлүүдийн бүх хувьсагч
    const [lessonState, setLessonState] = useState(initialState);

    // Хичээл нэмэх хувьсагч
    const [addLesson, setAddLesson] = useState(addLessonState);

    //UPLOAD хувьсагч
    const [loaded, setLoaded] = useState(0);

    //Комментуудын бүх хувьсагч
    const [writeState, setWriteState] = useState(writeComment);

    // категори багшийн нэр to lessonlist BACKEND
    const [name, setName] = useState(null);

    const [fileName, setFileName] = useState('');

    //Цэвэрлэгч функц
    const clearLessons = () => {
        if (cancelFileUpload.current) cancelFileUpload.current();
        if (cancelGetLessons.current) cancelGetLessons.current();
        setLessonState(initialState);
        setName(null);
        setAddLesson(addLessonState);
        setLoaded(0);
        setFileName('');
    };

    //Цэвэрлэгч функц
    const clearComments = () => {
        if (cancelPostComment.current) cancelPostComment.current();
        if (cancelGetComments.current) cancelGetComments.current();
        setWriteState(writeComment);
    };

    // хичээлийн нэр,видео хадгалах
    const lessonName = (name) => {
        setAddLesson({ ...addLesson, name });
    };
    const lessonFile = (video) => {
        setAddLesson({ ...addLesson, video });
        setLoaded(0);
    };

    //Баталгаажуулах
    const verifyAddLesson = (value) => {
        setAddLesson({ ...addLesson, verifyOpen: value });
    };

    //Нэг хичээл нэмэх
    const postAddLesson = (id) => {
        const data = new FormData();
        data.append("video", addLesson.video);
        data.append('form', addLesson.name);
        const config = {
            onUploadProgress: ProgressEvent => {
                const dataLoading = Math.round((ProgressEvent.loaded / ProgressEvent.total * 100));
                setLoaded(dataLoading);
            },
            cancelToken: new Axios.CancelToken(cancel => cancelFileUpload.current = cancel)
        };
        setAddLesson(addLessonState);
        axios.post(`/categories/${id}/lessons`, data, config).then(result => {
            setLessonState({ ...lessonState, lessons: [...lessonState.lessons, result.data.data] });
            setFileName('');
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log("Хэрэглэгч хуулахаа зогсоолоо LESSON...");
            } else {
                setAddLesson({ ...addLesson, errorAddLesson: err });
            };
            setLoaded(0);
            setFileName('');
        });
    };

    //Хэрэглэгч хуулж байгаа бичлэгийг зогсоох функц
    const fileCancelUpload = () => {
        if (cancelFileUpload.current) cancelFileUpload.current();
        setAddLesson(addLessonState);
        setFileName('');
    }

    //Бүх хичээлийг татаж авах
    const getLessons = (id) => {
        setLessonState({ ...lessonState, spinner: true })
        axios.get(`categories/${id}/lessons`, { cancelToken: new Axios.CancelToken(cancel => cancelGetLessons.current = cancel) }).then(result => {
            setLessonState({ ...lessonState, lessons: result.data.data, spinner: false });
            setName(result.data.teacherName);
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('хэрэглэгч хичээл татхаа больсон');
            } else {
                setLessonState({ ...lessonState, errorLessons: err, spinner: false });
            }
        });
    };

    //Бүх комментийг татаж авах
    const getComments = (id) => {
        console.log('first')
        setWriteState({ ...writeState, spinner: true });
        axios(`categories/${id}/comment`, { cancelToken: new Axios.CancelToken(cancel => cancelGetComments.current = cancel) }).then(result => {
            setWriteState({ ...writeState, comments: result.data.data, spinner: false });
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('хэрэглэгч comment татхаа больсон');
            } else {
                setWriteState({ ...writeState, errorComments: err });
            }
        });
    };

    //Коммент хадгалах
    const commentState = (comm) => {
        setWriteState({ ...writeState, writeComments: comm });
    };
    //Баталгаажуулах 
    const openVerify = (value) => {
        setWriteState({ ...writeState, verifyOpen: value });
    };

    //Коммент бичих post хийх
    const postComments = (ctx, id) => {
        const data = new FormData();
        data.append('name', ctx.form.firstname);
        data.append('phone', ctx.form.phone);
        data.append('comment', writeState.writeComments);
        data.append('user', ctx.form.userId);
        axios.post(`/categories/${id}/comment`, data, { cancelToken: new Axios.CancelToken(cancel => cancelPostComment.current = cancel) }).then(result => {
            setWriteState({ ...writeState, comments: [...writeState.comments, result.data.data], verifyOpen: false, writeComments: "" });
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('Comment POST хийж байхад page-ээс гарсан');
            }
            setWriteState({ ...writeState, verifyOpen: false, writeComments: "", errorComments: err });
            console.log(err)
        });
    };
    //тоглуулах хичээлийн ID хадгалах ийм IDтай хичээлийн мэлээллийг хадгална
    const searchLesson = (id) => {
        const lesson = lessonState.lessons.filter(el => el._id === id);
        setLessonState({ ...lessonState, lesson, lessonID: id })
    };

    // устгах хичээлийн ID-г хадгалах
    const deleteLesson = (id) => {
        setLessonState({ ...lessonState, lessonID: id, verifyOpen: true });
    };
    // Нэг хичээл устгах
    const deletedLesson = () => {
        axios.delete(`/lessons/${lessonState.lessonID}`).then(result => {
            const data = result.data.data._id;
            let array = [];
            if (lessonState.lessons) {
                lessonState.lessons.map(el => {
                    return array.push(el._id);
                });
            };
            const index = array.indexOf(data);
            if (index > -1) {
                lessonState.lessons.splice(index, 1);
                setLessonState({ ...lessonState, lessons: [...lessonState.lessons], lessonID: null });
            };
            setLessonState({ ...lessonState, verifyOpen: false, lessonID: null });
        }).catch(err => {
            console.log(err);
            setLessonState({ ...lessonState, verifyOpen: false, errorLessons: err, lessonID: null });
        });
    };

    // Баталгаажуулах хичээл
    const openVerifyLesson = (value) => {
        setLessonState({ ...lessonState, verifyOpen: value });
    };

    return <LessonContext.Provider value={{
        lessonState,
        writeState,
        addLesson,
        name,
        loaded,
        fileName,
        setName,
        searchLesson,
        getLessons,
        getComments,
        commentState,
        openVerify,
        postComments,
        deleteLesson,
        deletedLesson,
        openVerifyLesson,
        lessonName,
        lessonFile,
        verifyAddLesson,
        postAddLesson,
        clearLessons,
        fileCancelUpload,
        clearComments,
        setFileName
    }}>{props.children}</LessonContext.Provider>
};

export default LessonContext;
