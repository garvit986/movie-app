const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const connectDB = require('./ config/db')

require('dotenv').config();
const app = express();

app.use(bodyParser.json());

connectDB();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use('/api/', userRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});