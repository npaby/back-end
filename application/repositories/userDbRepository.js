export default function userDBRepository(repository) {
    const getUser = (user) => repository.getUser(user);
    const addUser = (user, password) => repository.addUser(user,password);
    const updateUser = (user, updates) => repository.updateUser(user, updates);
    const deleteUser = (user) => repository.deleteUserFromMongoDB(user);
    return { getUser, addUser, updateUser, deleteUser };
}

