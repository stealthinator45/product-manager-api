// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use('/public', express.static('public'));

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Product Manager API Server.' });
});

// Include product routes
require('./routes/product.routes.js')(app);

// Add Swagger setup
const setupSwagger = require('./swagger');
setupSwagger(app);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// Only start server if this file is run directly (not during testing)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  // Graceful shutdown handlers only when running as main module
  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received. Shutting down gracefully.');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.info('SIGINT signal received. Shutting down gracefully.');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });
}

// Export the Express app for testing
module.exports = app;
