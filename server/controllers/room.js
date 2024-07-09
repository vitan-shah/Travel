import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {
    const { hotelId } = req.params;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(
                hotelId,
                { $push: { rooms: savedRoom._id } }
            );
        } catch (error) {
            next(error);
        }
        return res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        return res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next) => {
    const { hotelId, id } = req.params;
    try {
        await Room.findByIdAndDelete(id);
        try {
            await Hotel.findByIdAndUpdate(
                hotelId,
                { $pull: { rooms: id } }
            );
        } catch (error) {
            next(error);
        }
        return res.status(200).json("Room has been deleted.");
    } catch (error) {
        next(error);
    }
}

export const getSingleRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        return res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        return res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
}