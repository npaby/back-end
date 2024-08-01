import UserModel from '../models/user.js';

export default function userRepositoryMongoDB() {
    const getUser = (userName) => {
        return UserModel.findOne({ username: userName });
    };
    const addUser = (username, password) => {
        const newUser = new UserModel({ username: username, password: password });
        console.log(newUser);
        return newUser.save();
    }
    const updateUser= (username, updates) => {
        const newUser = updates.username;
        const newPassword = updates.password;
        return UserModel.updateOne({ username: username }, { username: newUser, password: newPassword });
    }
    const deleteUser = (username) => {
        return UserModel.deleteOne({ username });
    };
    return { getUser, addUser, updateUser, deleteUser};
}