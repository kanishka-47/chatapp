import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

function checkForAuthenticationCookie() {
    return (req, res, next) => {
        try {
            const tokenCookieValue = req.cookies.token;
            if (!tokenCookieValue) {
                return res.status(401).json({ error: "No token provided" });
            }
        //    console.log("cookie",tokenCookieValue);
            const decoded = jwt.verify(tokenCookieValue, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request object
            return next(); // Proceed to the next middleware
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }
    };
}

export default checkForAuthenticationCookie;
