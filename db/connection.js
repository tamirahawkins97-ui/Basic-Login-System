//DEPENDANCIES 
const mongoose = require('mongoose');

//DATABASE

const connectDB = () =>{

 mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URI2) 

 const db = mongoose.connection; 

db.on('error', (error) => console.log(error.message + "MongoDB is not running."))
db.on('connected', () => console.log("MongoDB is Now Connected!"))
db.on('disconnected', () =>console.log("MongoDB has not been connected. Please Try Again. "))
};

module.exports = connectDB;