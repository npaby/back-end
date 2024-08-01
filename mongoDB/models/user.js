import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {versionKey:false});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
