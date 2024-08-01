import mongoose from "mongoose";

const dbName = 'your-database-name'; // Replace with your actual database name

export const initializeDbConnection = async () => {
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
        .then(() => console.log(`Connected to MongoDB database: ${dbName}`))
        .catch((error) => console.error(`Error connecting to MongoDB database: ${error.message}`));
};
export const disconnectedDbConnection = async () => {
    await mongoose.connection.close();
    console.log(`Disconnected from MongoDB database.`);
};