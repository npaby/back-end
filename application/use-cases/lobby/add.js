import lobby from '../../../entities/lobby.js'

export default function addLobby (lobbyName, lobbyDescription, repository) {
    const lobbyEntity = lobby(lobbyName, lobbyDescription);
    return repository.addLobby(lobbyEntity.getLobbyName(), lobbyEntity.getLobbyDescription());
}