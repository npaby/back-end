import express from 'express';
import { initializeDbConnection, getUser, addUser, deleteUser, updateUser, findIdByUser} from './db.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const start = async () => {
    await initializeDbConnection();
    app.post('/user', async (req, res) => {
        const { name, password } = req.body;
        try {
            await addUser(name, password);
            res.status(200).send('GET: User added successfully');
        } catch (error) {
            res.status(409).send(`GET: Error adding user: ${error.message}`);
        }
    });
    app.get('/user/:userName', async (req, res) => {
        const { userName } = req.params;
        try {
            console.log(`Getting user with name: ${userName}`);
            const user = await getUser(userName);
            if (user) {
                res.status(200).json();
            } else {
                res.status(404).json();
                console.log('GET: User not found');
            }
        } catch (error) {
            res.status(500).send(`GET: Error retrieving user: ${error.message}`);
        }
    });
    app.put('/user/:userName', async (req, res) => {
        const { userName } = req.params;
        const { name, password } = req.body;
        const updatedFields = { name, password };
        try {
            if (Object.keys(updatedFields).length === 0) {
                return res.status(400).send('No valid fields to update');
            }
            await updateUser(userName, updatedFields);
            res.status(200).send('User updated successfully');
        } catch (error) {
            res.status(500).send(`Error updating user: ${error.message}`);
        }
    });
    app.delete('/user/:userName', async (req, res) => {
        const { userName } = req.params;
        try {
            console.log(`Deleting user with username: ${userName}`);
            await deleteUser(userName);
            res.status(200).send('User deleted successfully');
        } catch (error) {
            res.status(500).send(`Error deleting user: ${error.message}`);
        }
    });
    app.get('/hello', (req, res) => {
        res.send('Hello World!');
    });
    app.listen(8000, () => console.log('Server is running on port 8000'));
};
start();

