//src/routes/lobbyRoutes.js
import {createLobby,getLobby, deleteLobby, leaveLobby, removeUserLobby, joinLobby} from '../controllers/lobbyController.js';
import express from 'express';
import bodyParser from 'express';
const router = express.Router();
router.use(bodyParser.json());
router.post('/', async (req, res) => {
    try {
        const { user, role, hero } = req.body; // Destructure the incoming request body
        const { userid, username} = user;
        // console.log(userid, username, hero, role);
        const lobby = await createLobby(userid,username, hero, role);
        res.status(201).json(lobby);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/:lobbyId', async (req, res) => {
    try{
        const lobby = await getLobby(req.params.lobbyId);
        if(lobby){
            res.status(200).json(lobby);
        } else {
            res.status(404).send('Lobby not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/join/:lobbyId/', async (req, res) => {
    const { lobbyId, userId, userName, role, hero } = req.params;
    console.log(`PUT_JOIN: ${lobbyId}`);
    try {
        await joinLobby(lobbyId, req.body.user.userID, req.body.user.username, req.body.role, req.body.hero);
        res.status(200).send(`PUT_JOIN: User ${req.body.user.userName} joined lobby ${lobbyId}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/leave/:lobbyId/:userId', async (req, res) => {
    const { lobbyId, userId } = req.params;
    console.log(`PUT_LEAVE: ${lobbyId} for user: ${userId}`);
    try {
        await leaveLobby(lobbyId, userId);
        res.status(200).send(`PUT_LEAVE: User ${userId} left lobby ${lobbyId}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/removeUser/:lobbyId/:currentUserId/:kickUserId', async (req, res) => {
    const {lobbyId, currentUserId, kickUserId } = req.params;
    console.log(`PUT_REMOVE_USER: ${lobbyId} for current user: ${currentUserId} and kick user: ${kickUserId}`);
    try {
        await removeUserLobby(lobbyId, currentUserId, kickUserId);
        res.status(200).send(`PUT_REMOVE_USER: User ${kickUserId} kicked from lobby ${lobbyId}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
router.delete('/:lobbyId/:user', async (req, res) => {
    const { lobbyId, user } = req.params;
    console.log(`DELETE: ${lobbyId} for user: ${user}`);
    try {
        await deleteLobby(lobbyId, user);
        res.status(200).send(`DELETE: Lobby ${lobbyId} deleted successfully`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
export default router;