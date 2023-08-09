import React, { useState } from 'react';
import Progress from './Progress';

const UploadVideo = ({ selectedItem, convertedItem }) => {
    const host = 'https://vid-frb3.onrender.com';
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedVideo, setConvertedVideo] = useState(null); // Define convertedVideo state
    const handleConvert = async () => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('video', selectedFile);
        formData.append('extension', convertedItem);

        try {
            const response = await fetch(`${host}/api/upload`, {
                method: 'POST',
                body: formData,
           
                
            });

            if (response.ok) {
                const responseData = await response.json();
                const newConvertedVideo = {
                    videoId: responseData.videoId,
                    fileName: responseData.convertedFileName,
                };
                setConvertedVideo(newConvertedVideo);

            } else {
                console.error('Video upload failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }

        setIsLoading(false);
    };



    const handleDownloadClick = async () => {
        if (convertedVideo) { // Ensure convertedVideo is not null
            try {
                const response = await fetch(`${host}/api/download/${convertedVideo.videoId}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${convertedVideo.fileName}.${convertedItem}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Delete the video from the database after successful download
                await fetch(`${host}/api/delete/${convertedVideo.videoId}`, {
                    method: 'DELETE',
                });
                window.location.reload();
            } catch (error) {
                console.error('An error occurred during download', error);
            }
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className="upload-container">
            <div className="upload-container mt-5">
                <label htmlFor="formFileLg" className="form-label">
                    <h4>Upload Video</h4>
                </label>
                <input
                    style={{ width: '400px' }}
                    onChange={handleFileChange}
                    className="form-control input form-control-lg"
                    id="formFileLg"
                    type="file"
                    accept={`.${selectedItem}`}
                />
                <button
                    type="button"
                    className="btn btn-dark my-3"
                    onClick={handleConvert}
                    disabled={!selectedFile}
                >
                    Convert
                </button>
                {isLoading ? (
                    <div>
                        <h4>Converting...</h4>
                        <Progress  />
                    </div>
                ) : (
                    convertedVideo && (
                        <button
                            type="button"
                            className="btn btn-dark my-3"
                            onClick={handleDownloadClick} // Remove the parentheses here
                        >
                            Download
                        </button>
                    )
                )}

            </div>
        </div>
    );
};

export default UploadVideo;
