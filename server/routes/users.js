import express from 'express';
import {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
} from '../controllers/user.js';
import {
    verifyAdmin,
    verifyUser
} from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/check-authentication', verifyToken, (_, res) => {
//     res.send("Hello User, You are logged in!");
// });
// router.get('/check-user/:id', verifyUser, (_, res) => {
//     res.send("Hello User, You are logged in and you can delete your account!");
// });
// router.get('/check-admin/:id', verifyAdmin, (_, res) => {
//     res.send("Hello Admin!");
// });

// UPDATE
router.put('/:id', verifyUser, updateUser);

// DELETE
router.delete('/:id', verifyUser, deleteUser);

// GET
router.get('/:id', verifyUser, getUser);

// GET ALL
router.get('/', verifyAdmin, getAllUsers);

export default router;