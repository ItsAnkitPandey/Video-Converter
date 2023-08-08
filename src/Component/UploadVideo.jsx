import React,{useState} from 'react'

const UploadVideo = ({selectedItem, convertedItem, onConvert}) => {
    const [convertedVideo, setConvertedVideo] = useState(null);

    const handleConvert = async () => {
        const convertedFile = await onConvert();
        setConvertedVideo(convertedFile);
    };

    const handleDownloadClick = () => {
        window.location.reload();
    };
    
    return (
        <div className='upload-container'>
            <div className='upload-container mt-5'>
                <label for="formFileLg" class="form-label"><h4>Upload Video</h4></label>
                <input style={{ width: '400px' }}  class="form-control form-control-lg" id="formFileLg" type="file" accept={`video/${selectedItem}`}/>
                <button type="button" class="btn btn-success my-3" onClick={handleConvert}>Convert to {convertedItem} </button>
                {convertedVideo && (
                    <a href={convertedVideo.url} download={convertedVideo.fileName} onClick={handleDownloadClick} className="btn btn-primary my-3">Download Converted Video</a>
                )}
            </div>
        </div>
    )
}

export default UploadVideo
