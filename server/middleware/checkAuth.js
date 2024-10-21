// checkAuth.js - Middleware to check if the user is authenticated

//import dependencies
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  try {
    //check if the token is present
    const token = req.cookies.steamAuthToken;
    if (!token) {
      return res.status(401).json({ message: "No Token" });
    }
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //set the user_id and user_email in the request object and pass it to the next middleware
    req.user_id = decoded.id;
    req.user_email = decoded.email;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default checkAuth;
