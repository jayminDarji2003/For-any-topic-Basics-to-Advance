const jwt = require("jsonwebtoken");
require("dotenv").config()

// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token;

        if (!token) {
            return res.stutus(401).json({
                success: false,
                message: "token missing"
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while verifying token"
        })
    }
}

// is student
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for student"
            })
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified"
        })
    }
}

// is admin
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for admin"
            })
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified"
        })
    }
}