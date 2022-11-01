import React, { useContext, useEffect, useRef } from 'react';
import { SpinnerCircular } from 'spinners-react';
import LessonContext from '../Context/LessonContext';
import { useParams } from 'react-router-dom';
import dateFormat from "dateformat";
import UserContext from '../Context/UserContext';
import VerifyBtn from './VerifyBtn';


function CommentList() {

    useEffect(() => {
        console.log('COMMENTlist useEffect ajillaj bn');
        getComments.current(categoryID);
        return () => {
            console.log('COMMENTlist цэвэрлэгч функц ажиллаж байна');
            cleanerFunc.current();
        }
    }, []);

    const LessonCtx = useContext(LessonContext);
    const ctx = useContext(UserContext);

    const CategoryID = useParams();

    let categoryID = useRef(null);
    categoryID = CategoryID.id;

    const getComments = useRef(null);
    const cleanerFunc = useRef(null);

    getComments.current = LessonCtx.getComments;
    cleanerFunc.current = LessonCtx.clearComments;

    const deleteComment = (id) => {
        LessonCtx.deleteCommentId(id);
    };

    return (
        <div className='  w-full h-auto mt-10 mb-24'>
            {LessonCtx.deleteComment.verifyOpen ? <VerifyBtn verify={LessonCtx.closeTab} universal={LessonCtx.deletedComment} /> : null}
            <h1 className=' text-center font-serif'><strong className='text-blue-600'>Ажилчдын бичсэн сэтгэгдэлүүд</strong></h1>
            {LessonCtx.writeState.spinner ?
                <div className='flex items-center justify-center h-screen'>
                    <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(253, 216, 53, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" />
                </div>
                :
                <ul>
                    {LessonCtx.writeState.comments ? LessonCtx.writeState.comments.map(el => {
                        return (
                            <li key={el._id} className='flex m-1 w-full font-main text-gray-800 p-4'>
                                <div className='w-full'>
                                    <h1 className='font-mono text-blue-600'>{el.name}</h1>
                                    <div className='flex text-xs'>
                                        <p className='mr-1'>{dateFormat(el.createdAt, 'isoDate')}</p>
                                        <p>{dateFormat(el.createdAt, 'isoTime')}</p>
                                    </div>
                                    <p className='text-gray-700'>{el.comment}</p>
                                </div>
                                {
                                    ctx.form.role === 'admin' ?
                                        <svg onClick={() => deleteComment(el._id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 cursor-pointer hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg> : null
                                }
                            </li>
                        )
                    }) : null}
                </ul>
            }
        </div >
    )
}

export default CommentList