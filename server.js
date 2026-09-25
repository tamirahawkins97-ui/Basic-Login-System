//DEPENDANCIES 
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 2218;
//USER ROUTE IMPORT 

//DATABASE CONNECTION 

//MIDDLEWARE 



//PORT 
app.listen(PORT, () =>{
    console.log(`Server is running on port: http://localhost:${PORT}`)
});