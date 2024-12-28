import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    let token = req.cookies.login_token;

    if (!token) return res.status(400).json({ success: false, message: 'Invalid' });

    let { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = id;

    next();
}