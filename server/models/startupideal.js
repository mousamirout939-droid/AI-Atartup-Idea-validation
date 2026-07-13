const mongoose = require('mongoose');

const startupIdeaSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    industry: { type: String, required: true, trim: true },
    targetMarket: { type: String, default: '' },
    stage: { type: String, enum: ['idea', 'prototype', 'mvp', 'launched'], default: 'idea' },
    status: {
      type: String,
      enum: ['draft', 'analyzing', 'completed', 'failed'],
      default: 'draft',
    },
    viabilityScore: { type: Number, default: null },
    verdict: { type: String, default: '' },
    isPublic: { type: Boolean, default: false },
    tags: [{ type: String }],
    analysisModules: {
      swot: { type: Boolean, default: false },
      market: { type: Boolean, default: false },
      competitor: { type: Boolean, default: false },
      investor: { type: Boolean, default: false },
      revenue: { type: Boolean, default: false },
      cost: { type: Boolean, default: false },
      techstack: { type: Boolean, default: false },
      businessplan: { type: Boolean, default: false },
      pitchdeck: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

startupIdeaSchema.index({ title: 'text', description: 'text', industry: 'text' });

module.exports = mongoose.model('StartupIdea', startupIdeaSchema);
