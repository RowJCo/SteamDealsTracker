//Checks if the user is authenticated by checking if the session has a userId
const checkAuth = async (req, res, next) => {
    try {
        if (req.session.userId) {
            return next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unable to check authorization" });
    }
};

export default checkAuth;