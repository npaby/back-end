//src/server.js
import express from 'express';
import mongoose from'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());

const dbName = 'your-database-name'; // Replace with your actual database name

const initializeDbConnection = async () => {
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
        .then(() => console.log(`Connected to MongoDB database: ${dbName}`))
        .catch((error) => console.error(`Error connecting to MongoDB database: ${error.message}`));
};
initializeDbConnection();

app.use('/user', userRoutes);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, () => console.log('Server is running on port 8000'));