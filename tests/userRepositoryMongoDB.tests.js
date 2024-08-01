// userRepositoryMongoDB.test.js
import { expect } from 'chai';
import UserModel from '../mongoDB/models/user.js';
import userRepositoryMongoDB from '../mongoDB/repositories/userRepositoryMongoDB.js';
import {initializeDbConnection, disconnectedDbConnection } from '../mongoDB/connection.js';
describe('userRepositoryMongoDB', function() {
    const { getUser, addUser, updateUserPassword, deleteUserFromMongoDB } = userRepositoryMongoDB();

    before(async function() {
        initializeDbConnection();
    });

    after(async function() {
        disconnectedDbConnection();
    });
    describe('getUser', function() {
        it('should find a user by username', async function() {
            const username = 'testUser';
            const password = 'password123';
            const mockUser = new UserModel({ username, password });
            await mockUser.save();
            const result = await getUser(username);
            console.log(`Found user: ${result.username} password: ${result.password} in the database.`);
            expect(result).to.be.an('object');
            expect(result.username).to.equal(username);
        });
    });
    describe('addUser', function() {
        it('should add a new user', async function() {
            const username = 'newUser';
            const password = 'password123';
            const result = await addUser(username, password);
            expect(result).to.be.an('object');
            expect(result.username).to.equal(username);

            const savedUser = await UserModel.findOne({ username });
            expect(savedUser).to.not.be.null;
            expect(savedUser.username).to.equal(username);
        });
    });
    describe('updateUserPassword', function() {
        it('should update the user password', async function() {
            const username = 'existingUxser';
            const password = 'password123';
            const newPassword = 'newPassword123';
            const mockUser = new UserModel({ username, password });
            await mockUser.save();
            const result = await updateUserPassword(username, newPassword);
            expect(result.modifiedCount).to.equal(1);
            const updatedUser = await UserModel.findOne({ username });
            expect(updatedUser.password).to.equal(newPassword);
        });
    });
    describe('deleteUserFromMongoDB', function() {
        it('should delete the user from the database', async function() {
            const username = 'userToDelete';
            const password = 'password123';
            const mockUser = new UserModel({ username, password });
            await mockUser.save();

            const result = await deleteUserFromMongoDB(username);

            expect(result.deletedCount).to.equal(1);

            const deletedUser = await UserModel.findOne({ username });
            expect(deletedUser).to.be.null;
        });
    });
});
