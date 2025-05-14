//Had to make this folder for vercel deployment
const app = require('../app');

// Export as a serverless function
module.exports = (req, res) => {
  app(req, res);
};