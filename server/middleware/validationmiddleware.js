// Re-exports the shared validate() middleware and rule sets so routes can
// import everything they need from a single place.
const {
  validate,
  registerRules,
  loginRules,
  ideaRules,
  forgotPasswordRules,
  resetPasswordRules,
} = require('../utils/validators');

module.exports = {
  validate,
  registerRules,
  loginRules,
  ideaRules,
  forgotPasswordRules,
  resetPasswordRules,
};
