//src/controllers/lobbyController.js
import Lobby from '../models/lobby.model.js';
import {v4 as uuidv4 } from 'uuid';

export const createLobby = async (currentUserId, currentUserName, currentUserHero, currentUserRole) => {
    console.log(currentUserId, currentUserName, currentUserHero, currentUserRole);
    const newLobby = new Lobby({
        lobbyId: uuidv4(),
        lobbySeats: [{
            user: {
                userID: String(currentUserId),
                isOwner: true,
                userName: String(currentUserName)
            },
            role: currentUserRole,
            hero: currentUserHero
        }]
    });
    try {
        const savedLobby = await newLobby.save();
        console.log('POST: New lobby created');
        return savedLobby;
    } catch (error) {
        console.error('POST: Error creating new lobby', error.message);
        throw error;
    }
};
export const getLobby = async (lobbyId) => {
    console.log(`GET: ${lobbyId}`);
    try {
        const lobby = await Lobby.findById(lobbyId);
        if (lobby !== 0) {
            return lobby;
        } else {
            throw new Error('GET: Lobby not found');
        }
    } catch (error) {
        console.error(`GET: Error fetching lobby: ${error.message}`);
        throw error;
    }
};
//

export const joinLobby = async (lobbyId, userId, userName, role, hero) => {
    console.log(`POST: Joining lobby ${lobbyId} for user ${userId}`);
    try {
        let lobby = await Lobby.findById(lobbyId);
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }
        if (lobby.lobbySeats.length >= 5) {
            throw new Error('POST: Lobby is already full. Cannot join.');
        } else {
            lobby = await Lobby.findByIdAndUpdate(lobbyId, {
                $push: {
                    lobbySeats: {
                        user: {
                            userID: 4343 ,
                            isOwner: false,
                            username: userName || 'User'
                        },
                        role,
                        hero
                    }
                }
            }, { new: true });
            if (lobby) {
                console.log('POST: User joined lobby successfully');
            } else {
                throw new Error('POST: Lobby not found');
            }
        }
    } catch (error) {
        console.error(`POST: Error joining lobby: ${error.message}`);
        throw error;
    }
};

export const leaveLobby = async (lobbyId, userId) => {
    console.log(`DELETE: Leaving lobby ${lobbyId} for user ${userId}`);
    try {
        let lobby = await Lobby.findById(lobbyId);
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }
        const seatIndex = lobby.lobbySeats.findIndex(seat => seat.user.userID === userId);
        if (seatIndex === -1) {
            console.log(seatIndex);
            throw new Error(`User ${userId} is not found in the lobby`);
        } else {
            lobby = await Lobby.findByIdAndUpdate(
                lobbyId, {
                    $pull: { lobbySeats: {'user.userID': userId}}}, { new: true }
                );
            if (lobby) {
                console.log('DELETE: User left lobby successfully');
            } else {
                throw new Error('DELETE: Lobby not found');
            }
        }
    } catch (error) {
        console.error(`DELETE: Error leaving lobby: ${error.message}`);
        throw error;
    }
};

export const removeUserLobby = async (lobbyId, currentUserID, kickUserId) => {
    console.log(`DELETE_REMOVE_USER: ${lobbyId} - Kicking ${kickUserId}`);
    try {
        const lobby = await Lobby.findOne({_id: lobbyId});
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }
        const isCurrentOwner = lobby.lobbySeats.some(seat =>
            seat.user.userID === currentUserID &&
            seat.user.isOwner === true
        );
        if (isCurrentOwner) {
            const seatIndex = lobby.lobbySeats.findIndex(seat => seat.user.userID === kickUserId);
            if (seatIndex !== -1) {
                lobby.lobbySeats.splice(seatIndex, 1);
                await lobby.save();
                console.log(`DELETE_REMOVE_USER: User ${kickUserId} kicked from lobby: ${lobbyId}`);
            } else {
                throw new Error(`DELETE_REMOVE_USER: User ${kickUserId} not found in the lobby`);
            }
        } else {
            throw new Error(`DELETE_REMOVE_USER: User ${currentUserID} is not the owner of the lobby`);
        }
    } catch (error) {
        console.error(`DELETE_REMOVE_USER: Error removing user from lobby: ${error.message}`);
        throw error;
    }
};

export const deleteLobby = async (lobbyId, currentUser) => {
    console.log(`DELETE: ${lobbyId}`);
    try {
        const lobby = await Lobby.findOne({ _id: lobbyId });
        if (!lobby) {
            throw new Error(`Lobby with ID ${lobbyId} not found`);
        }
        const isCurrentOwner = lobby.lobbySeats.some(seat =>
            seat.user.userID === currentUser &&
            seat.user.isOwner === true
        );
        if (isCurrentOwner) {
            await Lobby.findOneAndDelete({ _id: lobbyId }); // Use lobbyId for deletion
            console.log(`DELETE: Lobby deleted: ${lobbyId}`);
        } else {
            throw new Error(`DELETE: User ${currentUser} is not the owner of the lobby`);
        }
    } catch (error) {
        console.error(`DELETE: Error deleting lobby: ${error.message}`);
        throw error;
    }
};