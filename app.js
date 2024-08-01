import express  from "express";
import bodyParser from "body-parser";
import {initializeDbConnection} from "./mongoDB/connection.js";
import routes from "./routes/index.js";
const app = express();

app.use(bodyParser.json());
initializeDbConnection();

routes(app, express);
app.listen(8000, () =>
    console.log('Server is running on port 8000'));

export default app;