//src/routes/userRoutes.js
import {getUser,addUser,updateUser,deleteUser} from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, password } = req.body;
    try {
        await addUser(name, password);
        res.status(200).send('POST: User added successfully');
    } catch (error) {
        res.status(409).send(`POST: Error adding user. ${error.message}`);
    }
});
router.get('/:userName', async (req, res) => {
    const { userName } = req.params;
    try {
        const user = await getUser(userName);
        if (user) {
            res.status(200).send('GET: User retrieved successfully');
        } else {
            res.status(404).json('GET: Error retrieving user. ');
        }
    } catch (error) {
        res.status(500).send(`GET: Error retrieving user. ${error.message}`);
    }
});
router.put('/:userName', async (req, res) => {
    const { userName } = req.params;
    const { name, password } = req.body;
    const updatedFields = { name, password };
    try {
        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).send('PUT: No valid fields to update!');
        }
        await updateUser(userName, updatedFields);
        getUser(userName);
        res.status(200);
    } catch (error) {
        res.status(500).send(`PUT: Error updating user: ${error.message}`);
    }
});
router.delete('/:userName', async (req, res) => {
    const { userName } = req.params;
    try {
        await deleteUser(userName);
        res.status(200).send('DELETE: User deleted successfully');
    } catch (error) {
        res.status(500).send(`DELETE: Error deleting user: ${error.message}`);
    }
});


export default router;