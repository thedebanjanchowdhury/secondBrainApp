import jwt from 'jsonwebtoken';


export const userMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    const decoded = jwt.verify(header, process.env.USER_JWT_SECRET);
    if (decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({ message: 'Not Logged In' });
    }

}