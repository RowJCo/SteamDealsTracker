//Imports node modules
import jwt from 'jsonwebtoken';

//Checks if the user is authenticated by verifying the token
const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.Authorization;
        //checks if the token exists
        if (!token) {
            return res.status(401).json({ message: 'No Token' });
        }
        //decodes the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //adds the user id to the request
        req.user_id = decoded.user_id;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unable to check authorization" });
    }
};

export default checkAuth;