import React, { useContext } from 'react';
import Slider from "react-slick";
import NewsContext from '../Context/NewsContext';

function News() {

    const NewsCtx = useContext(NewsContext);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const onclick = (id) => {
        NewsCtx.getOneNews(id);
    };

    return (
        <div className='w-4/5 lg:w-11/12 xl:w-7/12 h-auto m-10 text-white'>
            <Slider {...settings}>
                {NewsCtx.newsState.news.map(el => {
                    return (
                        <div key={el._id} className="flex justify-center p-2">
                            <div className="rounded-xl shadow-lg bg-white max-w-sm">
                                <img className=" object-fill rounded-t-xl w-full h-60" src={`http://localhost:8000/${el.picture}`} alt="" />
                                <div className="p-6 bg-gray-100">
                                    <h5 className="text-sm text-blue-600 font-semibold mb-2">{`${el.name.slice(0, 25)} ...`}</h5>
                                    <p className="text-gray-700 text-xs mb-4">{`${el.news.slice(0, 200)} ...`}</p>
                                    <button onClick={() => onclick(el._id)} type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Унших</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default News