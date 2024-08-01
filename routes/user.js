
import express from 'express';
import userController from '../controllers/userController.js';
import userRepositoryMongoDB from '../mongoDB/repositories/userRepositoryMongoDB.js';
import userDBRepository from '../application/repositories/userDbRepository.js';

const router = express.Router();

const userRepo = userRepositoryMongoDB();
const userDbRepo = userDBRepository(userRepo);
const { getUserHandler, addUserHandler, updateUserHandler, deleteUserHandler} = userController(userDbRepo);

router.get('/', getUserHandler);
router.post('/', addUserHandler);
router.put('/', updateUserHandler);
router.delete('/',deleteUserHandler);
export default router;
