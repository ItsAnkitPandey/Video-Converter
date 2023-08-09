const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express();
const Video = require('./Video');

const fs = require('fs');
const path = require('path');

// Configure MongoDB connection
const DB = 'mongodb+srv://ankitpandey272003:Vidconverter@cluster0.jrswjlv.mongodb.net/VIdeoConverter?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

// Configure multer for file uploading
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());




// Handle video upload
app.post('/api/upload', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }

        const originalFileName = req.file.originalname;
        const convertedItem = req.body.extension; // Use convertedItem instead of extension

        const newFileName = `${path.parse(originalFileName).name}.${convertedItem}`; // Use convertedItem

        const newVideo = new Video({
            data: req.file.buffer,
            originalName: originalFileName,
            convertedName: newFileName,
            mimeType: req.file.mimetype,
        });

        await newVideo.save();

        return res.status(200).json({
            message: 'Video uploaded and renamed successfully',
            videoId: newVideo._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Handle video download
app.get('/api/download/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.set('Content-Disposition', `attachment; filename=${video.convertedName}`);
        res.contentType(video.mimeType);
        res.send(video.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ROUTE:3 DELETE THE VIDEO AFTER DOWNLAOD
app.delete('/api/delete/:videoId', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const deletedVideo = await Video.findByIdAndDelete(videoId);

    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    return res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
