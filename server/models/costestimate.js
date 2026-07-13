const mongoose = require('mongoose');

const costEstimateSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    oneTimeCosts: [{ item: String, amount: Number }],
    monthlyCosts: [{ item: String, amount: Number }],
    estimatedTotalFirstYear: { type: Number, default: 0 },
    fundingRecommendation: { type: String, default: '' },
    breakEvenEstimate: { type: String, default: '' },
    summary: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CostEstimate', costEstimateSchema);
