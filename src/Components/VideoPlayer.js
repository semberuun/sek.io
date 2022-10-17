
import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import LessonContext from '../Context/LessonContext';
import UserContext from '../Context/UserContext';
import Picture from '../Assets/img/photo.jpg';


//http://localhost:8000/api/v1/lessons/video/${res.data.date.video}
export default function VideoPlayer() {
    const LessonCtx = useContext(LessonContext);
    const ctx = useContext(UserContext);

    const videoEnd = () => {
        const data = new FormData();
        data.append('views', LessonCtx.lessonState.lessonID);
        ctx.lessonRegister(data, LessonCtx.lessonState.lessonID);
    };

    return (
        <>
            {LessonCtx.lessonState.lessonID === null ?
                <div className=' absolute top-0 left-0 w-full h-full'>
                    <img className=' object-cover w-full h-full' src={Picture} alt="" />
                </div>
                :
                <ReactPlayer className=" absolute top-0 left-0" width="100%" height="100%"
                    url={`http://localhost:8000/api/v1/lessons/video/${LessonCtx.lessonState.lessonID}`} controls onEnded={videoEnd} />}
        </>
    )
}

