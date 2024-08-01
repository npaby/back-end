import lobby from '../../../entities/lobby.js';
export default function getLobby (lobbyName, repository){
    const lobbyEntity = lobby(lobbyName);
    return repository.getLobby(lobbyEntity.getLobbyName());
}