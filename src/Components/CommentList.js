import React, { useContext, useEffect, useRef } from 'react';
import { SpinnerCircular } from 'spinners-react';
import LessonContext from '../Context/LessonContext';
import { useParams } from 'react-router-dom';

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

    const CategoryID = useParams();

    let categoryID = useRef(null);
    categoryID = CategoryID.id;

    const getComments = useRef(null);
    const cleanerFunc = useRef(null);

    getComments.current = LessonCtx.getComments;
    cleanerFunc.current = LessonCtx.clearComments;

    return (
        <div className='  w-full h-auto mt-10 mb-24'>
            <h1 className=' text-center font-serif'><strong className='text-blue-500'>Ажилчдын бичсэн сэтгэгдэлүүд</strong></h1>
            {LessonCtx.writeState.spinner ?
                <div className='flex items-center justify-center h-screen'>
                    <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(253, 216, 53, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" />
                </div>
                :
                <ul>
                    {LessonCtx.writeState.comments ? LessonCtx.writeState.comments.map(el => {
                        return (
                            <li key={el._id} className='m-1 w-full font-main text-gray-800 p-4 '>
                                <h1 className='font-mono text-indigo-500'>{el.name}</h1>
                                <p className='text-gray-700'>{el.comment}</p>
                            </li>
                        )
                    }) : null}
                </ul>
            }
        </div >
    )
}

export default CommentList