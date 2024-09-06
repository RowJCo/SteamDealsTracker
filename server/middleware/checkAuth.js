//Imports dependencies
import jwt from 'jsonwebtoken';

//Checks if the user is authenticated by verifying the token
const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.Authorization;
        if (!token) {
            return res.status(401).json({ message: 'No Token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unable to check authorization" });
    }
};

export default checkAuth;