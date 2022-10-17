import React, { useContext, useEffect, useRef } from 'react';
import { SpinnerCircular } from 'spinners-react';
import LessonContext from '../Context/LessonContext';
import UserContext from '../Context/UserContext';
import VerifyBtn from './VerifyBtn';
import { useParams } from 'react-router-dom';

export default function LessonList() {

    useEffect(() => {
        console.log('LESSONlist useEffect ajillaj bn...');
        getLessons.current(categoryID);
        return () => {
            console.log('LESSONlist цэвэрлэгч функц...');
            cleanerFunc.current();
        }
    }, []);

    const LessonCtx = useContext(LessonContext);
    const ctx = useContext(UserContext);
    const CategoryID = useParams();

    const getLessons = useRef(null);
    const cleanerFunc = useRef(null);

    let categoryID = useRef(null);
    categoryID = CategoryID.id;

    getLessons.current = LessonCtx.getLessons;
    cleanerFunc.current = LessonCtx.clearLessons;

    const onClick = (id) => {
        LessonCtx.searchLesson(id);
        console.log('uzheer darlaa...')
    };

    const deleteClick = (id) => {
        LessonCtx.deleteLesson(id);
        console.log('ustgahaar darlaa...')
    };

    const viewLesson = (el) => {
        const data = ctx.form.views.filter(e => e === el._id);
        if (data.length === 0) {
            return 'text-gray-600';
        } else {
            return 'text-blue-600';
        }
    }

    return (
        <div className=' w-full h-screen flex justify-center'>
            <div className=' w-5/6 h-full overflow-y-scroll flex'>
                {LessonCtx.lessonState.verifyOpen ? <VerifyBtn verify={LessonCtx.openVerifyLesson} universal={LessonCtx.deletedLesson} /> : null}
                {LessonCtx.lessonState.spinner ?
                    <div className='w-full flex justify-center'>
                        <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(253, 216, 53, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" />
                    </div>
                    :
                    <ul className='w-full font-serif '>
                        {LessonCtx.lessonState.lessons.map(el => {
                            return (
                                <div key={el._id} className=' flex items-center justify-between m-1 w-full border-b-2 p-3 border-gray-300 '>
                                    <div className={viewLesson(el)}>
                                        <li onClick={() => onClick(el._id)} className=' w-11/12 cursor-pointer hover:text-yellow-500'>{el.name}</li>
                                    </div>
                                    {
                                        ctx.form.role === 'admin' ?
                                            <div onClick={() => deleteClick(el._id)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div> : null
                                    }
                                </div>
                            )
                        })}
                    </ul>
                }
            </div >
        </div >
    )
}
