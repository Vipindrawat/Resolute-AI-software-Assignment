import jwt from 'jsonwebtoken'

const Authentication = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ "success": false, "error": "Unauthorized user" });
    }
    try {
        // Verify token and attach payload to req.user
        const payload = jwt.verify(token, process.env.SIGNATURE);
        req.user = payload;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle invalid token error
        return res.status(401).json({ "success": false, "error": "Unauthorized user" });
    }

}
export default Authentication;

