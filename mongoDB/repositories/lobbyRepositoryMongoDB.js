import LobbyModel from '../models/lobby.js';

export default function lobbyRepositoryMongoDB() {
    const addLobby = (lobbyName, lobbyDescription) => {
        const newLobby = new LobbyModel({ lobbyName: lobbyName, lobbyDescription: lobbyDescription });
        return newLobby.save();
    }
    const getLobby = (lobbyName) => {
        return LobbyModel.findOne({lobbyName:lobbyName})
    }
    const deleteLobby = (lobbyName) => {
        return LobbyModel.deleteOne({lobbyName:lobbyName})
    }
    const updateLobby = (lobbyName, lobbyDescription) => {
        return LobbyModel.updateOne({lobbyName: lobbyName}, {lobbyDescription: lobbyDescription});
    }
    return {addLobby, getLobby, deleteLobby, updateLobby};
}