import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import hotelsRoutes from './routes/hotels.js';
import roomsRoutes from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on('disconnected', () => {
    console.log("Database Disconnected!");
});

const __dirname = dirname(fileURLToPath(import.meta.url));
// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/rooms', roomsRoutes);
app.use(express.static(path.resolve(__dirname + '/client')));
app.use(express.static(path.resolve(__dirname + '/admin')));

app.get('/admin/*', (_, res) => {
    res.sendFile(path.resolve(__dirname + '/admin' + '/index.html'));
});
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname + '/client' + '/index.html'));
});

app.use((err, _, res, __) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    connect();
    console.log(`Server is listening on port ${PORT}`);
})