import userRoutes from './user.js';
import lobbyRoutes from './lobby.js';
export default function routes(app, express) {
    app.use('/api/users', userRoutes);
    app.use('/api/lobby',lobbyRoutes)
}
