import React from 'react';
import 'chart.js/auto';
import { Doughnut, Line, PolarArea } from 'react-chartjs-2';

export default function UserGrafic() {

    const data = {
        labels: ['red', 'blue', 'yellow'],
        datasets: [{
            data: [12, 9, 7],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
        }]
    };

    return (
        <div className='xl:flex xl:flex-wrap m-1'>
            <div className='xl:w-96 xl:h-96 mt-8 bg-white rounded-lg shadow-lg mr-1'>
                <Doughnut data={data} />
            </div>
            <div className='xl:w-96 xl:h-96 mt-8 bg-white rounded-lg shadow-lg mr-1'>
                <Line data={data} />
            </div>
            <div className='xl:w-96 xl:h-96 mt-8 bg-white rounded-lg shadow-lg'>
                <PolarArea data={data} />
            </div>
        </div>
    )
}
