//DEPENDANCIES 
const express = require('express');
const router = express.Router()
const User = require('../models/User');
import bcrypt from "bcrypt"

//ROUTES 

//I.N.D.U.C.E.S

//Index - all user listings 


//N

//Create - Create a POST route (e.g., /api/users/register or /users/register)

//Building the Registration Endpoint 
router.post('/users/register', async (req, res) => {

    try {
   // 1. Take username, email, and password from req.body
    const { username, password, email} = req.body;

   // 2. Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser){
        return res.status(400).json({error: 'A user with that email already exists. Please try again' })
    }

    //3. Create a new User document with the provided data

    const newUser = new User ({
        username, 
        email,
        password,

    });

    //4. Save the User to the database 
    await newUser.save();

    //5. Exclude the password from the user registration.

    const userResponse = newUser.toObject();
    delete userResponse.password;

    //6. Return a 201 status for the user being created successfully!

    return res.status(201).json(userResponse);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

//Build the Login Endpoint 
router.post('/api/users/login', async (req,res) =>{
    try{
        const { email, password} = req.body;

        const user = await User.findOne({ email });

        //if a user's email or passowrd is incorrect 
        if(!user){
           res.status(400).json({error:'Incorrect email or password.' }) 
        }

        //Compare incoming password with stored hash
        const isMatch = typeof user.isCorrectPassword === 'function'
        ? await user.isCorrectPassword(password)
        : await bcrypt.compare(password, user.password);

        //if the password is NOT the correct 
        if(!isMatch){
            return res.status(400).json({error: 'Incorrect email or password.'})
        }

        // Create JWT with non-sensitive payload (_id and username)
        const payload = {
            _id: user._id,
            username: user.username
        }

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'})

        //Exclude password from returned user data
        const userData = user.toObject();
        delete userData.password;

        //Respond with token and user data 
        return res.status(200).json({token, user: userData})

    } catch (error){
        return res.status(500).json({ error: error.message })
    

    } 

})
//E

//S

module.exports = router;