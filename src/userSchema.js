// Entities
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String},
    password: { type: String}
}, { versionKey: false });

export default mongoose.model('User', UserSchema);
