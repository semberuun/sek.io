import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import axios from '../axios';

export default function PdfViewerPage() {

    const [url, setUrl] = useState(null);
    let id = useParams();
    const variable = useRef(null);
    variable.current = id.id;

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        axios.get(`/safety/${variable.current}`).then(result => setUrl(result.data.data)).catch(err => console.log(err));
    }, []);

    return (
        <div className=' w-full h-auto lg:p-24'>
            {url === null ? null :
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                    <Viewer fileUrl={`http://localhost:8000/${url}`} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
            }
        </div>
    )
}
