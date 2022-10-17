import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';
import LessonContext from '../Context/LessonContext';
import VerifyBtn from './VerifyBtn';

import { useParams } from 'react-router-dom';

export default function WriteComment(props) {

    const ctx = useContext(UserContext);
    const LessonCtx = useContext(LessonContext);

    const CategoryID = useParams();

    const comment = (e) => {
        e.preventDefault();
        const comment = e.target.value;
        LessonCtx.commentState(comment);
    };

    const onClick = () => {
        LessonCtx.openVerify(true);
    };

    const postComment = () => {
        LessonCtx.postComments(ctx, CategoryID.id);
    };

    return (
        <div className=' mt-8'>
            {LessonCtx.writeState.verifyOpen ? <VerifyBtn verify={LessonCtx.openVerify} universal={postComment} /> : null}
            <h1 className=' pb-3 text-lg'>Сургалтанд сэтгэгдэл бичих</h1>
            <textarea onChange={comment} value={LessonCtx.writeState.writeComments} className='w-full h-32 border rounded-lg border-yellow-500 shadow-lg pl-2 text-sm pt-2 focus:outline-none' placeholder='Сургалтын талаарх таны сэтгэгдэл ямар байна' />
            <div className='w-full flex justify-end'>
                <button disabled={LessonCtx.writeState.writeComments === '' ? true : false} onClick={onClick} className={` w-full py-2 rounded-lg text-white mt-2 sm:w-1/2 ${LessonCtx.writeState.writeComments === '' ? 'bg-gray-300 border-gray-300' : 'bg-yellow-500 cursor-pointer hover:bg-yellow-400'}`}>Сэтгэгдэл үлдээх</button>
            </div>
        </div>
    )
}
