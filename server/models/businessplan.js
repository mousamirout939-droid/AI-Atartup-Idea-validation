const mongoose = require('mongoose');

const businessPlanSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    executiveSummary: { type: String, default: '' },
    problemStatement: { type: String, default: '' },
    solution: { type: String, default: '' },
    businessModel: { type: String, default: '' },
    marketingStrategy: { type: String, default: '' },
    milestones: [{ milestone: String, timeline: String }],
    risksAndMitigation: [{ risk: String, mitigation: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusinessPlan', businessPlanSchema);
