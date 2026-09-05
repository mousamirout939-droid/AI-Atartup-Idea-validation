const { ApiError } = require('../utils/apiresponse');

const companyOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'company') {
    throw new ApiError(403, 'Access denied: company privileges required');
  }
  next();
};

module.exports = { companyOnly };