const mongoose = require('mongoose');

const techStackSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'StartupIdea', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    frontend: [{ type: String }],
    backend: [{ type: String }],
    database: [{ type: String }],
    hosting: [{ type: String }],
    thirdPartyServices: [{ type: String }],
    estimatedBuildTime: { type: String, default: '' },
    reasoning: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TechStack', techStackSchema);
