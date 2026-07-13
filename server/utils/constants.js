module.exports = {
  ROLES: {
    USER: 'user',
    ADMIN: 'admin',
  },
  IDEA_STATUS: {
    DRAFT: 'draft',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },
  SUBSCRIPTION_PLANS: {
    FREE: 'free',
    PRO: 'pro',
    ENTERPRISE: 'enterprise',
  },
  PLAN_LIMITS: {
    free: { ideasPerMonth: 3, exportsPerMonth: 1 },
    pro: { ideasPerMonth: 25, exportsPerMonth: 25 },
    enterprise: { ideasPerMonth: Infinity, exportsPerMonth: Infinity },
  },
  PLAN_PRICING: {
    pro: { amount: 99900, currency: 'INR', label: 'Pro' }, // paise -> ₹999
    enterprise: { amount: 499900, currency: 'INR', label: 'Enterprise' },
  },
  PAYMENT_STATUS: {
    CREATED: 'created',
    PAID: 'paid',
    FAILED: 'failed',
  },
  NOTIFICATION_TYPES: {
    ANALYSIS_COMPLETE: 'analysis_complete',
    PAYMENT_SUCCESS: 'payment_success',
    SYSTEM: 'system',
  },
};
