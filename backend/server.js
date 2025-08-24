const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { setupSocket } = require('./config/socket');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Setup Socket.IO
setupSocket(server);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
