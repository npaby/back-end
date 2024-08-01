import addLob from '../application/use-cases/lobby/add.js';
import getLob from '../application/use-cases/lobby/get.js';
import deleteLob from '../application/use-cases/lobby/delete.js';
import updateLob from '../application/use-cases/lobby/update.js';
export default function lobbyController(lobbyDbRepository) {
    const addLobby = async (req,res) => {
        try {
            const {lobbyName, lobbyDescription } = req.body;
            const lobby = await addLob(lobbyName, lobbyDescription, lobbyDbRepository);
            res.json(lobby);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    const getLobby = async (req, res) => {
        try{
            const {lobbyName} = req.body;
            const lobby = await getLob (lobbyName, lobbyDbRepository);
            res.json(lobby);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    const deleteLobby = async (req, res) => {
        try{
            const {lobbyName} = req.body;
            const lobby = await deleteLob(lobbyName, lobbyDbRepository);
            res.json(lobby);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    const updateLobby = async (req, res) => {
        try{
            const {lobbyName, lobbyDescription} = req.body;
            const lobby = await updateLob(lobbyName, lobbyDescription, lobbyDbRepository);
            res.json(lobby);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    return { addLobby, getLobby, deleteLobby, updateLobby};
}
