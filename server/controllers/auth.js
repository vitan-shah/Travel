import User from '../models/User.js';
import { createError } from '../utils/error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: passwordHash,
        });
        await newUser.save();
        return res.status(201).send("User has been created");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, 'User not found with this username!'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, 'Wrong Username or Password!'));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ details: { ...otherDetails }, isAdmin });
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res) => {
    // Clearing the cookie
    res.clearCookie('access_token');
    return res.status(200).json({ success: true, message: "User Logged Out." });
}

export const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, 'You are not authenticated!'));
    }
    let isAdmin;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Invalid Access Token!"));
        isAdmin = user.isAdmin;
    });
    return res.status(200).json({ isAdmin });
}