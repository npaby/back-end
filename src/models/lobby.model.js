// src/models/user.model.js
import mongoose from 'mongoose';
import uuid from 'uuid';
const UserSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
    lobbyId: {type: String},
    lobbySeats: [{type: String}],

}, {versionKey: false});

export default mongoose.model('User', UserSchema);
