// fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  // Add other fields as needed
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;
