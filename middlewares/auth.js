const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {
    try {
        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) {
                    console.error("Token verification error:", err);
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated");
        }
    } catch (error) {
        console.error("Error in verify middleware:", error);
        return res.status(500).json("An error occurred");
    }
};


const isAdmin = (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You dont have enough privileges");
        }
    } catch (error) {
        console.error("Error verifying admin priviliges:", error);
        return res.status(500).json("An error occurred");
    }
};

module.exports = {verify, isAdmin};