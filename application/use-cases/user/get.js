import user from '../../../entities/user.js';

export default function getUser(userName, userRepository) {
    const userEntity = user(userName);
    return userRepository.getUser(userEntity.getUserName(),userEntity.getPassword());
}
