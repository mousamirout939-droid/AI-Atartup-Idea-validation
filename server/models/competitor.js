const mongoose = require('mongoose');

const competitorSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    competitors: [
      {
        name: String,
        description: String,
        strengths: [String],
        weaknesses: [String],
        estimatedMarketShare: String,
      },
    ],
    competitiveAdvantage: { type: String, default: '' },
    differentiationScore: { type: Number, default: 0 },
    summary: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Competitor', competitorSchema);
