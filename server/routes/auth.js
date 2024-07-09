import express from 'express';
import {
    login,
    logout,
    register,
    verifyAdmin as verifyAdminController
} from '../controllers/auth.js';

const router = express.Router();

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

// LOGOUT
router.post('/logout', logout)

// ADMIN VERIFICATION
router.post('/verify-admin', verifyAdminController)

export default router;