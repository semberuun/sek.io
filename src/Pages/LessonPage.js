import React, { useContext } from 'react';
import FaceGroup from '../Components/FaceGroup';
import LessonList from '../Components/LessonList';
import LessonName from '../Components/LessonName';
import LessonTeacher from '../Components/LessonTeacher';
import Video from '../Components/VideoPlayer';
import WriteComment from '../Components/WriteComment';
import AddLesson from '../Components/AddLesson';
import UserContext from '../Context/UserContext';
import CommentList from '../Components/CommentList';


export default function LessonPage() {

    const ctx = useContext(UserContext);

    return (
        <div className='block md:flex'>
            <div className='m-4 md:w-2/3 lg:pl-20 xl:pl-40'>
                <FaceGroup />
                <div className=' relative pt-9/16 '>
                    <Video />
                </div>
                <div className='pt-8'>
                    <LessonName />
                    <LessonTeacher />
                </div>
                {ctx.form.role === 'admin' ? <AddLesson /> : null}
                <WriteComment />
                <CommentList />
            </div>
            <div className='md:w-1/3 mt-5'>
                <div className='flex items-center w-full h-auto pl-10'>
                    <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polygon points="23 7 16 12 23 17 23 7" />  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                    <h1 className='pl-2 font-mono font-medium'>Хичээлүүд</h1>
                </div>
                <LessonList />
            </div>
        </div>
    )
}
