//DEPENDANCIES 
const express = require('express');
const router = express.Router()
const User = require('../models/User');

//ROUTES 

//I.N.D.U.C.E.S

//Index - all user listings 


//N

//Create - (POST /Users)

router.post('/users/register', async (req, res) => {

    try {
    const { username, password, email} = req.body;
    const cleanEmail = email.trim().toLowerCase()
    const cleanUsername = username.trim()

    //Search for existing email or username:

    const existingUser = await User.findOne({
        $or: [{email: cleanEmail}, {username: cleanUsername}]
    })

    if (existingUser){
        return res.status(400).json({error: 'A user with that email or username already exists.' })
    }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

//E

//S