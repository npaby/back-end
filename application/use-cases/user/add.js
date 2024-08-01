import user from '../../../entities/user.js';

export default function addUser(username, password, repository) {
    const userEntity = user(username, password);
    return repository.addUser(userEntity.getUserName(), userEntity.getPassword());
}