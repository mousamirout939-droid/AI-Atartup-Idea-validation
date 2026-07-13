const mongoose = require('mongoose');

const pitchDeckSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slides: [{ title: String, content: String }],
    pptUrl: { type: String, default: '' },
    pdfUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PitchDeck', pitchDeckSchema);
