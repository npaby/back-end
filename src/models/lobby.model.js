import mongoose from 'mongoose';

const LobbySchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
    lobbyId: {type: String},
    lobbySeats: [
        {
            user: {
                userID: {type: String},
                isOwner: {type: Boolean},
                userName: {type: String}
            },
            role: {type: String},
            hero: {type:String},
            _id:false
        }
    ],
}, {versionKey: false});

LobbySchema.pre('save', function(next) {
    if (this.isNew && this.lobbySeats.length === 0) {
        this.lobbySeats = Array.from({length: 5}, () => ({userId: 0, role: 0}));
    }
    next();
});

export default mongoose.model('Lobby', LobbySchema);