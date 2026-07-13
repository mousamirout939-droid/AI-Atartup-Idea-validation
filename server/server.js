require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { notFound, errorHandler } = require('./middleware/errormiddleware');
const { apiLimiter } = require('./middleware/rarelimitmiddleware');

// Routes
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');
const startupRoutes = require('./routes/startuproutes');
const swotRoutes = require('./routes/swotroutes');
const marketRoutes = require('./routes/marketroutes');
const competitorRoutes = require('./routes/competitorroutes');
const investorRoutes = require('./routes/investorroutes');
const revenueRoutes = require('./routes/revenueroutes');
const costRoutes = require('./routes/costroutes');
const techstackRoutes = require('./routes/techstackroutes');
const pitchdeckRoutes = require('./routes/pitchdeckroutes');
const reportRoutes = require('./routes/reportroutes');
const paymentRoutes = require('./routes/paymentroutes');
const notificationRoutes = require('./routes/notificationroutes');
const adminRoutes = require('./routes/adminroutes');

const app = express();

connectDB();

// ---- Core middleware ----
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
  stream: { write: (msg) => logger.info(msg.trim()) },
}));
app.use('/api', apiLimiter);

// ---- Static files (generated PDF/PPTX reports) ----
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---- Health check ----
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// ---- API routes ----
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/swot', swotRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/competitor', competitorRoutes);
app.use('/api/investor', investorRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/cost', costRoutes);
app.use('/api/techstack', techstackRoutes);
app.use('/api/pitchdeck', pitchdeckRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
});

module.exports = app;
