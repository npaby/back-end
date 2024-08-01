import lobby from '../../../entities/lobby.js';

export default function deleteLobby(lobbyName, repository){
    const lobbyEntity = new lobby(lobbyName);
    return repository.deleteLobby(lobbyEntity.getLobbyName());
}