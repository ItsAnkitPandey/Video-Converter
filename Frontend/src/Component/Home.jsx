import React, { useState } from 'react'
import UploadVideo from './UploadVideo';

const Home = () => {
    const [selectedItem, setSelectedItem] = useState('MP4');
    const [convertedItem, setConvertedItem] = useState('WEBM');


    const handleItemClick = (item) => {
        if (item !== convertedItem) {
            setSelectedItem(item);
        }
    };
    const handleConvertedClick = ((item) => {
        if (item !== selectedItem) {
            setConvertedItem(item)
        }
    });

    const handleConvert = async () => {
        // Simulate conversion process by waiting for a few seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Replace this with actual logic to fetch converted video from backend
        const convertedFile = {
            url: 'path_to_converted_video',
            fileName: `converted_video.${convertedItem}`
        };
        return convertedFile;
    };
    return (
        <div>
            <div className="home-container " >
                <div className="home-details mt-5">
                    <h2>{selectedItem} to {convertedItem} converter</h2>
                    <p>VidConvert converts your video files online. Amongst many others, <br />we support MP4, WEBM and AVI. You can use the options to <br /> control video resolution, quality and file size.</p>
                </div>
                <div className="home-funtions">
                    <h5>convert</h5>
                    <div className="dropdown mx-2 ">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedItem}
                        </button>
                        <ul className="dropdown-menu bg-dark">
                            <li><p className="dropdown-item text-white" onClick={() => handleItemClick("MP4")} >MP4</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleItemClick("AVI")}>AVI</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleItemClick("MKV")}>MKV</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleItemClick("3GP")}>3GP</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleItemClick("WEBM")}>WEBM</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleItemClick("MOV")}>MOV</p></li>
                        </ul>
                    </div>
                    <h5>to</h5>
                    <div className="dropdown mx-2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {convertedItem}
                        </button>
                        <ul className="dropdown-menu bg-dark">
                            <li><p className="dropdown-item text-white" onClick={() => handleConvertedClick("MP4")} >MP4</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleConvertedClick("AVI")}>AVI</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleConvertedClick("MKV")}>MKV</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleConvertedClick("3GP")}>3GP</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleConvertedClick("WEBM")}>WEBM</p></li>
                            <li><p className="dropdown-item text-white" onClick={() => handleConvertedClick("MOV")}>MOV</p></li>
                        </ul>
                    </div>

                </div>
            </div>
            <UploadVideo selectedItem={selectedItem} convertedItem={convertedItem} onConvert={handleConvert}/>
           
        </div>
    )
}

export default Home
