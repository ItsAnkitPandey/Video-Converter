import React,{useState} from 'react'
import Progress from './Progress';

const UploadVideo = ({selectedItem, convertedItem, onConvert}) => {

    const [convertedVideo, setConvertedVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)

    const handleConvert = async () => {
       setIsLoading(true); // Set loading to true before conversion
        const convertedFile = await onConvert();
        setConvertedVideo(convertedFile);
        setIsLoading(false);
    };

    const handleDownloadClick = () => {
        window.location.reload();
    };
    
    const handleFileChange = (event) =>{
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div className='upload-container'>
            <div className='upload-container mt-5'>
                <label for="formFileLg" class="form-label"><h4>Upload Video</h4></label>
                <input style={{ width: '400px' }}  onChange={handleFileChange}  class="form-control input form-control-lg" id="formFileLg" type="file" accept={`.${selectedItem}`}/>
                <button type="button"class="btn btn-dark my-3" onClick={handleConvert} disabled={!selectedFile}>Convert to {convertedItem} </button>
                {isLoading ? (
                   <Progress /> // Display loading indicator while converting
                ) : (
                    convertedVideo && (
                        <a href={convertedVideo.url} download={convertedVideo.fileName} onClick={handleDownloadClick} className="btn btn-primary my-3">Download Converted Video</a>
                    )
                )}
            </div>
        </div>
    )
}

export default UploadVideo
