import mongoose from 'mongoose';
import User from './userSchema.js';

const dbName = 'your-database-name'; // Replace with your actual database name

export const initializeDbConnection = async () => {
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
        .then(() => console.log(`Connected to MongoDB database: ${dbName}`))
        .catch((error) => console.error(`Error connecting to MongoDB database: ${error.message}`));
};
export const findIdByUser = async (userName) => {
    const user = await User.findOne({ name: userName });
    if (user) {
        return user._id;
    } else {
        console.log('User not found');
        return 0;
    }
};

export const getUser = async (userName) => {
    console.log(`GET: ${userName}`);
    const userId = await findIdByUser(userName);
    try {

        const user = await User.findById(userId);

        if (user) {

            return user;
        } else {
            console.log('User not found');
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        throw error;
    }
};
export const addUser = async (name, password) => {
    console.log('POST:NEW');
    const existingUser = await findIdByUser(name);
    console.log(`Checking if user already exists with the name: ${existingUser}`);
    if(!existingUser){
        try {
            const newUser = new User({ name, password });
            await newUser.save();
        } catch (error) {
            console.error(`Error adding user: ${error.message}`);
            throw error;
        }
    } else{
        console.log(`User already exists with the name: ${name}`);
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
            console.log('User not found');
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
        console.log(`Deleting user with id: ${userId} from the database`);
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
