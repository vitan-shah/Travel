import express from 'express';
import {
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
    getHotelRooms,
    hotelCountByCity,
    hotelCountByType,
    updateHotel
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post('/', verifyAdmin, createHotel);

// UPDATE
router.put('/:id', verifyAdmin, updateHotel);

// DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

// GET
router.get('/find/:id', getHotel);

// GET ALL
router.get('/', getAllHotels);
router.get("/countByCity", hotelCountByCity);
router.get("/countByType", hotelCountByType);
router.get("/room/:id", getHotelRooms);

export default router;