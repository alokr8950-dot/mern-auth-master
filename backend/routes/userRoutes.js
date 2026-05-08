import express from 'express';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  makeAdmin,
} from '../controllers/userController.js';

import {
  protect,
} from '../middleware/authMiddleware.js';

const router = express.Router();


// REGISTER
router.post('/', registerUser);


// LOGIN
router.post('/auth', authUser);


// LOGOUT
router.post('/logout', logoutUser);


// PROFILE
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


// MAKE ADMIN
router.put(
  '/admin/:id',
  makeAdmin
);


export default router;