// Run with: npm run seed:admin
// Creates (or promotes) an admin user from ADMIN_EMAIL / ADMIN_PASSWORD env vars.
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Subscription = require('../models/subscription');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL || 'admin@ideavalidator.app';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  let user = await User.findOne({ email });
  if (user) {
    user.role = 'admin';
    await user.save();
    console.log(`Existing user ${email} promoted to admin.`);
  } else {
    user = await User.create({ name: 'Admin', email, password, role: 'admin', isVerified: true });
    await Subscription.create({ user: user._id, plan: 'enterprise' });
    console.log(`Admin user created: ${email} / ${password}`);
  }

  await mongoose.disconnect();
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
