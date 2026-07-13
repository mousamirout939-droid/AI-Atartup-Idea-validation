const mongoose = require('mongoose');

const investorScoreSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    overallScore: { type: Number, default: 0 },
    criteria: {
      marketPotential: { type: Number, default: 0 },
      teamFeasibility: { type: Number, default: 0 },
      innovation: { type: Number, default: 0 },
      scalability: { type: Number, default: 0 },
      revenueModel: { type: Number, default: 0 },
    },
    investmentReadiness: { type: String, default: '' },
    strengths: [{ type: String }],
    concerns: [{ type: String }],
    recommendation: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('InvestorScore', investorScoreSchema);
