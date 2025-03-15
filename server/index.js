require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const actorRoutes = require('./routes/actorRoutes');
const producerRoutes = require('./routes/producerRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/producers', producerRoutes);
app.use('/api/movies', movieRoutes);

app.use('/', (req, res) => {
  res.send('FourJunctions');
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
});
