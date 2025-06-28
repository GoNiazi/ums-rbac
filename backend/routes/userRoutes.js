import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('view_users'), getUsers);
router.post('/', authMiddleware, roleMiddleware('create_user'), createUser);
router.put('/:id', authMiddleware, roleMiddleware('edit_user'), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware('delete_user'), deleteUser);

export default router;