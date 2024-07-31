//src/controllers/userController.js
import mongoose from 'mongoose';
import User from '../models/user.model.js';

export const findIdByUser = async (userName) => {
    const user = await User.findOne({ name: userName });
    if (user) {
        return user._id;
    } else {
        console.log('User not found');
        return 0;
    }
};
export const listAllUsers = async () => {
    console.log('GET: All users');
    const allUsers = await User.find({});
    console.log(`Total users: ${allUsers.length}`);
    return allUsers;
};
export const getUser = async (userName) => {
    console.log(`GET: ${userName}`);
    const userId = await findIdByUser(userName);
    try {
        const user = await User.findById(userId);
        if (user !== 0) {
            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        throw error;
    }
};
export const addUser = async (name, password) => {
    const existingUser = await findIdByUser(name);
    if(!existingUser){
        try {
            const newUser = new User({ name, password });
            await newUser.save();
        } catch (error) {
            console.error(`Error adding user: ${error.message}`);
            throw error;
        }
    } else{
        throw new Error('User already exists');
    }
};
export const updateUser = async (userName, updatedFields) => {
    try {
        const userId = await findIdByUser(userName);
        const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {new: true});
        if (updatedUser) {
            console.log(`User updated: ${updatedUser.name}`);
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        throw error;
    }
};
export const deleteUser = async (userName) => {
    try {
        const userId = await findIdByUser(userName);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        console.log(`User deleted: ${deletedUser.name}`);
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        throw error;
    }
};
const user = () => {
    return "Neil";
}
export const hello = async (req, res) => {
    res.send(`Hello user ${user}`);
}

