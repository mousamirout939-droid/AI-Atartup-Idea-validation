const mongoose = require('mongoose');

const revenueModelSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    suggestedModels: [{ type: String }],
    primaryModel: { type: String, default: '' },
    pricingStrategy: { type: String, default: '' },
    projections: [
      {
        year: Number,
        revenue: Number,
        customers: Number,
      },
    ],
    revenueStreams: [{ type: String }],
    summary: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RevenueModel', revenueModelSchema);
