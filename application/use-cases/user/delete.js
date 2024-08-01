import user from '../../../entities/user.js';

export default function deleteUser(username, repository) {
    const userEntity = user(username);
    return repository.deleteUser(userEntity.getUserName());
}
