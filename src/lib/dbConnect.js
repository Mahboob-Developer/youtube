// lib/dbConnect.js
import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('MongoDB connection error: ' + error.message);
    }
};

export default dbConnect;
