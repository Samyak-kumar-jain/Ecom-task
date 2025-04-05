const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {


    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {

        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;


        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
