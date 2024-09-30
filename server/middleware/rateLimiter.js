//Imports node modules
import limiter from 'express-rate-limit';

//Limits the number of requests from an IP address
const rateLimiter = limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

export default rateLimiter;