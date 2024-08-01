import express from 'express';
import lobbyController from '../controllers/lobbyController.js';
import lobbyDbRepository from '../application/repositories/lobbyDbRepository.js';
import lobbyRepositoryMongoDB from '../mongoDB/repositories/lobbyRepositoryMongoDB.js';

const router = express.Router();
const lobbyRepo = lobbyRepositoryMongoDB();
const lobbyDbRepo = lobbyDbRepository(lobbyRepo);
const controller = lobbyController(lobbyDbRepo);

router.post('/', controller.addLobby);
router.get('/', controller.getLobby);
router.put('/', controller.updateLobby);
router.delete('/', controller.deleteLobby);
export default router;
