const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    format: { type: String, enum: ['pdf', 'pptx'], required: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
