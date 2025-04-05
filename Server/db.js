const mongoose = require('mongoose');

async function connectToDatabase() {
    const uri = process.env.MONGO_DB_URI; // Replace with your MongoDB URI

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase;
