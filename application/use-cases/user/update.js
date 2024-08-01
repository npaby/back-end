import user from "../../../entities/user.js";


export default function updateUser(userName, updates, repository) {
    const userEntity = new user(userName);
    console.log(updates);
    return repository.updateUser(userEntity.getUserName(),updates);
}