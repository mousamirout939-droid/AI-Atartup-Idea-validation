const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: 'General Feedback' },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: null },
    status: { type: String, enum: ['new', 'reviewed', 'resolved'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
