import React, { useState, useRef } from "react";
import axios from '../axios';
import Axios from "axios";

const CategoryContext = React.createContext();

const categoriesState = {
    categories: [],
    categoryId: null,
    spinner: false,
    errorCategories: null
};

const addCategoryState = {
    name: '',
    file: null,
    teacher: '',
    errorAddCategory: null
}

export const CategoryStore = props => {

    const cancelFileUpload = useRef(null);
    const getCategoriesClear = useRef(null);

    //категориудын state
    const [categories, setCategories] = useState(categoriesState);

    const [loaded, setLoaded] = useState(0);

    //Хуудаслалт
    const [pagination, setPagination] = useState(null);

    //Баталгаажуулалт state
    const [verifyOpen, setVerifyOpen] = useState(false);

    //категори шинээр нэмэх state
    const [addCategories, setAddCategories] = useState(addCategoryState);

    //Цэвэрлэгч функц
    const clearFunc = () => {
        if (getCategoriesClear.current) getCategoriesClear.current();
        if (cancelFileUpload.current) cancelFileUpload.current();
        setCategories(categoriesState);
        setPagination(null);
        setVerifyOpen(false);
        setAddCategories(addCategoryState);
        setLoaded(0);
    };

    const getCategoryId = (categoryId) => {
        setCategories({ ...categories, categoryId });
    };

    const addCategoryName = (name) => {
        setAddCategories({ ...addCategories, name });
    };

    const addCategoryTeacher = (teacher) => {
        setAddCategories({ ...addCategories, teacher });
    };

    const addCategoryFile = (file) => {
        setAddCategories({ ...addCategories, file });
        setLoaded(0);
    };

    // бүх категориудыг дуудах
    const getCategories = (currentPage) => {
        setCategories({ ...categories, spinner: true });
        axios.get(`/categories?page=${currentPage || 1}`, { cancelToken: new Axios.CancelToken(cancel => getCategoriesClear.current = cancel) }).then(res => {
            setPagination(res.data.pagination);
            const data = res.data.data;
            setCategories({ ...categories, categories: data, spinner: false });
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log('хэрэглэгч категориудыг татхаас өмнө өөр үйлдэл хийлээ....')
            }
            setCategories({ ...categories, spinner: false, errorCategories: err });
        });
    };

    // категори устгах
    const deleteCategory = () => {
        setVerifyOpen(false);
        axios.delete(`/categories/${categories.categoryId}`).then(result => {
            const data = result.data.data._id;
            let array = [];
            if (categories.categories) {
                categories.categories.map(el => {
                    return array.push(el._id);
                });
            };
            const index = array.indexOf(data);
            if (index > -1) {
                categories.categories.splice(index, 1);
                setCategories({ ...categories, categories: [...categories.categories] });
            };
        }).catch(err => {
            setCategories({ ...categories, errorCategories: err });
        });
    }

    // категори шинээр үүсгэх
    const addCategory = () => {
        const data = new FormData();
        data.append("file", addCategories.file);
        data.append('form', addCategories.name);
        data.append('teacherName', addCategories.teacher);
        const config = {
            onUploadProgress: ProgressEvent => {
                const dataLoading = Math.round((ProgressEvent.loaded / ProgressEvent.total * 100));
                setLoaded(dataLoading);
            },
            cancelToken: new Axios.CancelToken(cancel => cancelFileUpload.current = cancel)
        };
        axios.post('/categories', data, config).then(result => {
            setCategories({ ...categories, categories: [...categories.categories, result.data.data] });
        }).catch(err => {
            if (Axios.isCancel(err)) {
                console.log("Хэрэглэгч хуулахаа зогсоолоо CATEGORY...");
            } else {
                setAddCategories({ ...addCategories, errorAddCategory: err });
            };
            setLoaded(0);
        });
        setAddCategories(addCategoryState);
    };

    //Хэрэглэгч хуулж байгаа FILE зогсоох функц
    const cancelUpload = () => {
        if (cancelFileUpload.current) cancelFileUpload.current();
        setAddCategories(addCategoryState);
    }

    return <CategoryContext.Provider value={{
        categories,
        verifyOpen,
        addCategories,
        pagination,
        loaded,
        setLoaded,
        clearFunc,
        setAddCategories,
        setVerifyOpen,
        setCategories,
        getCategories,
        deleteCategory,
        addCategory,
        addCategoryName,
        addCategoryTeacher,
        addCategoryFile,
        getCategoryId,
        cancelUpload
    }}>{props.children}</CategoryContext.Provider>
};


export default CategoryContext;
