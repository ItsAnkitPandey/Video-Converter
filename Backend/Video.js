const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  data: Buffer,          // Video binary data
  originalName: String,  // Original filename
  convertedName: String, // Renamed filename
  mimeType: String,      // Mime type of the video
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
