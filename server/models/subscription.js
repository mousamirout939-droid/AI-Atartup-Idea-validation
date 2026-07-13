const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
    startedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
    autoRenew: { type: Boolean, default: false },
    lastPayment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    history: [
      {
        plan: String,
        changedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
