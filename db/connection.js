//DEPENDANCIES 
const mongoose = require('mongoose');

//DATABASE

const connectDB = () =>{
  mongoose.connect(process.env.MONGO_URI2 || process.env.MONGO_URI, {
    dbName: 'login-system',
  });

  const db = mongoose.connection;

  db.on('error', (error) => console.log(error.message + 'MongoDB is not running.'));
  db.on('connected', () => console.log(`MongoDB is Now Connected! Database: ${db.name}`));
  db.on('disconnected', () => console.log('MongoDB has not been connected. Please Try Again. '));
};

module.exports = connectDB;