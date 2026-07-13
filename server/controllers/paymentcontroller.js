const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const Payment = require('../models/payment');
const Subscription = require('../models/subscription');
const User = require('../models/user');
const Notification = require('../models/notification');
const { sendPaymentSuccessEmail } = require('../services/emailservice');
const { ApiError, sendResponse, asyncHandler } = require('../utils/apiresponse');
const { PLAN_PRICING } = require('../utils/constants');

const createOrder = asyncHandler(async (req, res) => {
  if (!razorpay) throw new ApiError(503, 'Payment gateway is not configured on the server');

  const { plan } = req.body;
  const pricing = PLAN_PRICING[plan];
  if (!pricing) throw new ApiError(400, 'Invalid plan selected');

  const order = await razorpay.orders.create({
    amount: pricing.amount,
    currency: pricing.currency,
    receipt: `receipt_${req.user._id}_${Date.now()}`,
    notes: { userId: req.user._id.toString(), plan },
  });

  await Payment.create({
    user: req.user._id,
    razorpayOrderId: order.id,
    plan,
    amount: pricing.amount,
    currency: pricing.currency,
    status: 'created',
  });

  sendResponse(
    res,
    201,
    { orderId: order.id, amount: pricing.amount, currency: pricing.currency, keyId: process.env.RAZORPAY_KEY_ID },
    'Order created'
  );
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    await Payment.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { status: 'failed' });
    throw new ApiError(400, 'Payment verification failed: signature mismatch');
  }

  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'paid' },
    { new: true }
  );
  if (!payment) throw new ApiError(404, 'Order not found');

  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  const user = await User.findByIdAndUpdate(
    payment.user,
    { plan: payment.plan, planExpiresAt: expiresAt },
    { new: true }
  );

  await Subscription.findOneAndUpdate(
    { user: payment.user },
    {
      plan: payment.plan,
      startedAt: new Date(),
      expiresAt,
      lastPayment: payment._id,
      $push: { history: { plan: payment.plan } },
    },
    { upsert: true }
  );

  await Notification.create({
    user: payment.user,
    type: 'payment_success',
    title: 'Payment successful',
    message: `You've been upgraded to the ${payment.plan} plan.`,
  });

  sendPaymentSuccessEmail(user, payment.plan, payment.amount).catch(() => {});

  sendResponse(res, 200, { user: user.toSafeObject() }, 'Payment verified and plan upgraded');
});

const getPaymentHistory = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });
  sendResponse(res, 200, { payments }, 'Payment history fetched');
});

module.exports = { createOrder, verifyPayment, getPaymentHistory };
