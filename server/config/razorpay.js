const Razorpay = require('razorpay');
const logger = require('../utils/logger');

let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  logger.warn('Razorpay credentials not set. Payment endpoints will fail until configured.');
}

module.exports = razorpay;
