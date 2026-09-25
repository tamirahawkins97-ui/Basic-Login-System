//DEPENDANCIES 
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 2218;


//DATABASE CONNECTION 

//MIDDLEWARE 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use

app.get('/', (req, res) => {
    const username = req.body[`username`]

    res.send(`Welcome! ${username}`);
});

//Mount Rounter Here.

//PORT 
app.listen(PORT, () =>{
    console.log(`Server is running on port: http://localhost:${PORT}`)
});