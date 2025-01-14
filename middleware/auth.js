const jwt = require('jsonwebtoken')

const {TOKEN_KEY, ADMIN_KEY} = process.env;

const verifyToken = (req, res, next) => {
    const token = 
    req.body.token || req.query.token || req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try{

        const decoded = jwt.verify(token, TOKEN_KEY);
        req.user = decoded;
    }
    catch(err) {
        return res.status(401).send("Invalid token")
    }

    return next();

}

const verifyTokenAndAdmin = (req, res, next) => {
    const token = 
    req.body.token || req.query.token || req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try{

        const decoded = jwt.verify(token, ADMIN_KEY);
        req.admin = decoded;
    }
    catch(err) {
        return res.status(401).send("Invalid token")
    }

    return next();

}

module.exports = {verifyToken, verifyTokenAndAdmin};