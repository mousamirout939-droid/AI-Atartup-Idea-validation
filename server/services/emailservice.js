const transporter = require('../config/mail');
const logger = require('../utils/logger');

const FROM = process.env.SMTP_FROM || 'AI Startup Idea Validator <no-reply@ideavalidator.app>';

async function sendMail({ to, subject, html }) {
  if (!transporter) {
    logger.info(`[email:mock] To: ${to} | Subject: ${subject}`);
    return { mocked: true };
  }

  return transporter.sendMail({ from: FROM, to, subject, html });
}

const sendWelcomeEmail = (user) =>
  sendMail({
    to: user.email,
    subject: 'Welcome to AI Startup Idea Validator 🚀',
    html: `<div style="font-family:sans-serif;max-width:520px;margin:auto">
      <h2 style="color:#4f46e5">Welcome, ${user.name}!</h2>
      <p>Your account is ready. Submit your first startup idea and let our AI validate it across 9 dimensions — market, competitors, revenue, investor readiness and more.</p>
      <p style="color:#6b7280">— The AI Startup Idea Validator Team</p>
    </div>`,
  });

const sendPasswordResetEmail = (user, resetUrl) =>
  sendMail({
    to: user.email,
    subject: 'Reset your password',
    html: `<div style="font-family:sans-serif;max-width:520px;margin:auto">
      <h2 style="color:#4f46e5">Password Reset Request</h2>
      <p>Click the link below to reset your password. This link expires in 30 minutes.</p>
      <p><a href="${resetUrl}" style="background:#4f46e5;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Reset Password</a></p>
      <p style="color:#6b7280">If you didn't request this, you can safely ignore this email.</p>
    </div>`,
  });

const sendAnalysisCompleteEmail = (user, idea) =>
  sendMail({
    to: user.email,
    subject: `Your analysis for "${idea.title}" is ready`,
    html: `<div style="font-family:sans-serif;max-width:520px;margin:auto">
      <h2 style="color:#4f46e5">Analysis Complete ✅</h2>
      <p>Your startup idea <strong>${idea.title}</strong> scored <strong>${idea.viabilityScore}/100</strong> — ${idea.verdict}.</p>
      <p>Log in to your dashboard to view the full report.</p>
    </div>`,
  });

const sendPaymentSuccessEmail = (user, plan, amount) =>
  sendMail({
    to: user.email,
    subject: 'Payment successful — plan upgraded',
    html: `<div style="font-family:sans-serif;max-width:520px;margin:auto">
      <h2 style="color:#4f46e5">Payment Successful</h2>
      <p>You've been upgraded to the <strong>${plan}</strong> plan. Amount charged: ₹${(amount / 100).toFixed(2)}.</p>
    </div>`,
  });

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendAnalysisCompleteEmail,
  sendPaymentSuccessEmail,
};
