import userModel from "../models/user.model.js";
import { hashpassword, comparePassword } from "../utils/authPassword.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
export const signup = async (req, res) => {
    try {
        // console.log("hello");
        const { name, email, password, mobile } = req.body;

        //verifying for unique email always while signup
        const user = await userModel.findOne({ email });
        const userMobile = await userModel.findOne({ mobile });
        if (user) {
            return res.status(400).json({
                message: "Email exist pls use other email to sign-up with any other account",
                success: false
            })
        }

        if (userMobile) {
            return res.status(400).json({
                message: "Mobile number already exist",
                success:false
            })
        }
        //validation for mobile no.
        if (mobile.length < 10) {
            return res.status(400).json({
                message: "Please enter your correct mobile number",
                success: false
            })
        }

        //signup user and hashing password
        const newUser = new userModel({
            name,
            email,
            password: await hashpassword(password),
            mobile
        })

        const saveUser = await newUser.save();


        res.status(201).json({
            message: "Signup successfully",
            success: true,
            saveUser
        })
    } catch (error) {
        res.status(400).json({
            message: "internal server error",
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        //email should exist
        if (!user) {
            return res.status(400).json({
                message: "Email not exist!!",
                success: false
            })
        }

        //check password
        const comparedPassword = await bcrypt.compare(password,user.password);
        // const comparedPassword = await comparePassword(password,user.password);
        if (!comparedPassword) {
            return res.json({
                message: "Invalid password",
                success: false
            })
        }

        //if email is exist or password is correct => create jwt token

        const jwtToken = jwt.sign({ _id: user._id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            message: "Login successfully!!",
            success: true,
            jwtToken

        })



    } catch (error) {
        return res.status(400).json({
            message: "internal server error",
            error
        })

    }
}

export const onlyForName = async(req,res) => {
    try {
        const userName = req.name;

        return res.status(200).json({
            message:"Here is the user name",
            success:true,
            userName
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error found while fetching userName",
            success:false
        })
    }
}