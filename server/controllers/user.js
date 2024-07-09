import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary';

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        cloudinary.uploader.destroy(user.cloudinary.public_id)
            .then(response => {
                user.remove();
                return res.status(200).json("User has been deleted.");
            })
            .catch(error => {
                next(error);
            });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}