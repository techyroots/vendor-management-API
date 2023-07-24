// const fs = require('fs');

// exports.fileupload = function (req, res) {
//   try {
//     const filedata = fs.readFileSync(req.file.path);
//     const path = req.file.path;
//     return res.status(200).json({
//       success: true,
//       result: {
//         name: req.file.filename,
//         path: path,
//         data: filedata,
//       },
//       message: 'File Upload Successfull!',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: true,
//       result: error.message,
//       message: 'File Not Supported!',
//     });
//   }
// };

// In a separate file, e.g., "uploadController.js"
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Assuming you have a mongoose model for the file
    const FileModel = mongoose.model('File');

    // Create a new document for the file and save it to the database
    const newFile = new FileModel({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      // Add other relevant information as needed
    });

    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully!' });
  } catch (err) {
    console.error('Error uploading file:', err.message);
    res.status(500).json({ error: 'Failed to upload the file.' });
  }
};

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload files to the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the filename to make it unique
  },
});

const upload = multer({ storage: storage });

// Export the uploadImage function
module.exports = { fileupload };

