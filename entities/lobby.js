export default function lobby(lobbyName, lobbyDescription) {
    return{
        getLobbyName: () => lobbyName,
        getLobbyDescription: () => lobbyDescription
    }
}