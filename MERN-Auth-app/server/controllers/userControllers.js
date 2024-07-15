const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Log the incoming request body
        console.log('Request body => ', req.body);

        // Check if all required fields are provided
        if (!name || !email || !password || !role) {
            console.log('all fields are required')
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("user already exits in database")
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Secure password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create entry in database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            success: true,
            message: "Successfully registered",
            user
        });
    } catch (error) {
        console.error("Error while registering:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        // fetch data
        const { email, password } = req.body;

        // validate
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }

        // check if user is already registered or not
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "you are not registed, please register first"
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
            name: user.name
        }

        if (await bcrypt.compare(password, user.password)) {
            // password matched
            // create jwt token
            let token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                });

            // user.token = token;
            // req.user = user;

            // create cookie
            // const options = {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: "none"
            // }

            // create cookie and send response
            // res.cookie("token", token, options).status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "user logged in successfully"
            // })

            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
                .json({
                    message: "login successful",
                });
        }

    } catch (error) {
        console.log("ERROR WHILE LOGIN")
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



const users = async (req, res) => {
    try {
        const cookieData = req.cookies;

        console.log(cookieData)

        if (cookieData !== undefined) {
            return res.status(200).json({
                success: true,
                message: "users found successfully",
                data: cookieData
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "token not found",
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while getting user"
        })
    }
}

const jwt_secret = "jaymindarji"

const data = async (req, res) => {
    const token = jwt.sign({ _id: "difbfbsfi" }, jwt_secret);

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
        .json({
            message: "login successful",
        });
}



module.exports = { register, login, users, data }