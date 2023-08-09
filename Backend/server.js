const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const cors = require('cors');


const app = express();
const port = 3001;

const storage = multer.memoryStorage(); // Store file in memory (for demo purposes)
const upload = multer({ storage });

app.use(cors());


app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const format = req.body.format || 'webm';
    const convertedFileName = `converted_video.${format}`;

    ffmpeg()
    .input(req.file.buffer)
    .inputFormat(req.file.originalname.split('.').pop())
    .toFormat(format)
    .on('end', () => {
        const filePath = path.join(__dirname, convertedFileName);
        res.download(filePath, convertedFileName, () => {
            // Clean up the converted file after it's downloaded
            fs.unlinkSync(filePath);
        });
    })

        .on('error', (err) => {
            console.error('Error converting file:', err);
            res.status(500).send('Error converting file.');
        })
        .saveToFile(convertedFileName);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
