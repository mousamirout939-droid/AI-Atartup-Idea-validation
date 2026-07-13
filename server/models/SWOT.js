const mongoose = require('mongoose');

const swotSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    opportunities: [{ type: String }],
    threats: [{ type: String }],
    summary: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SWOT', swotSchema);
