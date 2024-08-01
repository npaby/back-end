import getUser from '../application/use-cases/user/get.js';
import addUser from '../application/use-cases/user/add.js';
import updateUser from '../application/use-cases/user/update.js';
import deleteUser from "../application/use-cases/user/delete.js";
export default function userController(userDbRepository) {
    const getUserHandler = async (req, res) => {
        try {
            const { username } = req.body;
            const user = await getUser(username, userDbRepository);
             if(user === null){
                 res.status(404).send('User not found!');
             } else {
                 res.status(201).json('User found!');
             }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    const addUserHandler = async (req, res) => {
        try {
            const {username, password } = req.body;
            await addUser(username, password, userDbRepository);
            res.status(201).send('User added successfully!');
        } catch (error) {
            if(error.code === 11000) {
                console.log('Username already exists!');
                res.status(500).send('Username already exists!');
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    const updateUserHandler = async (req, res) => {
        try {
            let { username, updates } = req.body;
            const updatedUser = await updateUser(username, updates, userDbRepository);
            if(updatedUser.modifiedCount === 0 && updatedUser.matchedCount === 0) {
                res.status(404).send('User not found!');
            } else if (updatedUser.acknowledged === false){
                res.status(400).send('No updates provided!');
            } else {
                res.status(201).send('User password updated successfully!');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    const deleteUserHandler = async (req, res) => {
        try {
            const { username } = req.body;
            const toDelete = await deleteUser(username, userDbRepository);
            if(toDelete.acknowledged === true && toDelete.deletedCount === 0){
                res.status(500).send('User not found!');
            } else {
                res.status(201).send('User deleted successfully!');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    return { getUserHandler, addUserHandler, updateUserHandler, deleteUserHandler };
}
