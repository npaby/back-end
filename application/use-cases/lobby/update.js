import lobby from '../../../entities/lobby.js';

export default function updateLobby (lobbyName, lobbyDescription, repository){
    const lobbyEntity = lobby(lobbyName, lobbyDescription);
    return repository.updateLobby(lobbyEntity.getLobbyName(), lobbyEntity.getLobbyDescription());
};