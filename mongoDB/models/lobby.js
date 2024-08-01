import mongoose from 'mongoose';

const LobbySchema = new mongoose.Schema({
    lobbyName: { type: String, required: true },
    lobbyDescription: { type: String, required: true }
},{versionKey: false});

const LobbyModel = mongoose.model('Lobby', LobbySchema);

export default LobbyModel;