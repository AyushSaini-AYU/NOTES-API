const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;



const signUp = async (req, res) => {

    //Existing User Ko Check karenge
    //Hashed password ( encryption of password )
    //create new user
    //Token generate

    const {username, email, password} = req.body;
    try{
        
        const existingUser = await userModel.findOne(  { email: email } )
        if( existingUser ){
            return res.status(400).json( {message: " User already exists "} )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({

            username: username,
            email: email,
            password: hashedPassword

        });

        const token = jwt.sign( { email: newUser.email, id: newUser._id }, SECRET_KEY );
        
        res.status(201).json({ user: newUser, token });

    }
    catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something Is Wrong" }); 

    }

};


const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const existingUser = await userModel.findOne(  { email: email } )
        if( !existingUser ){
            return res.status(404).json( {message: " User not exists "} )
        }

        const matchPassword = await bcrypt.compare( password, existingUser.password );

        if( !matchPassword ){
            return  res.status(400).json({  message: "Password Is Wrong" })
        }

        
        const token = jwt.sign( { email: existingUser.email, id: existingUser._id }, SECRET_KEY );
        
        res.status(200).json({ user: existingUser, token : token });

    } catch (error) {

        
        console.log(error);
        res.status(500).json({ message: "Something Is Wrong" }); 
        
    }

};

module.exports = { signUp, signIn };