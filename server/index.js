// index.js
const path = require('path');
const fs = require('fs');
const dotenv = require("dotenv/config");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Import the http module
const socketIo = require('socket.io'); // Import socket.io
const authRoutes = require('./routes/authRoutes');
const initializeAdmin = require('./utils/initializeAdmin');
const menuRoutes = require('./routes/menuRoutes');
const snackRoutes = require('./routes/snackRoutes');
const drinkRoutes = require('./routes/drinkRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'https://glittering-kheer-3db923.netlify.app', // Adjust this if your frontend runs on a different URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Integrate Socket.IO with the server and apply CORS options
const io = socketIo(server, {
  cors: corsOptions,
});

app.set('io', io); // Attach the io instance to the app

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    initializeAdmin(); // Call initializeAdmin after successful DB connection
  })
  .catch((err) => console.log("Database not connected", err));

app.use(express.json());
app.use(cors(corsOptions));


// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadsDir));

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/menu-items', menuRoutes);
app.use('/api/snacks', snackRoutes);
app.use('/api/drink', drinkRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/order', orderRoutes);

// Set up Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
