export default function lobbyDbRepository(repository) {
    const addLobby = (lobbyName, lobbyDescription) => repository.addLobby(lobbyName,lobbyDescription);
    const getLobby = (lobbyName) => repository.getLobby(lobbyName);
    const deleteLobby = (lobbyName) => repository.deleteLobby(lobbyName);
    const updateLobby = (lobbyName, lobbyDescription) => repository.updateLobby(lobbyName,lobbyDescription)
    return { addLobby, getLobby, deleteLobby, updateLobby };
}