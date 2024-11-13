import jwt from 'jsonwebtoken'

const Authentication = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ "success": false, "error": "Unauthorized user" });
    }
    const payload = jwt.verify(token, SIGNATURE);
    if (!payload) {
        res.status(401).json({ "success": false, "error": "Unauthorized user" });
    }
    req.user = payload;
    next();

}
export default Authentication;

