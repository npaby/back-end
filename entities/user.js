export default function user(name, password) {
    return {
        getUserName: () => name,
        getPassword: () => password
    };
}
