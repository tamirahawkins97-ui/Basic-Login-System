//DEPENDANCIES
const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 2218;
const UserRoutes = require('./routes/UserRoutes');
const connectDB = require('./db/connection');

//CONNECT TO THE DATABASE
connectDB();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mount Router Here
app.use('/api', UserRoutes);

app.get('/', (req, res) => {
  res.send('Welcome!');
});

//PORT
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});