import express from 'express';
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getSingleRoom,
    updateRoom,
    updateRoomAvailability
} from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post('/:hotelId', verifyAdmin, createRoom);

// UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put('/:id', verifyAdmin, updateRoom);

// DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

// GET
router.get('/:id', getSingleRoom);

// GET ALL
router.get('/', getAllRooms);

export default router;