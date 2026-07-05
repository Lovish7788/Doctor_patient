import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Database connected Successfully');
        })
        await mongoose.connect(process.env.MONGO_DB)
    }
    catch (err) {
        console.log(`Failed to Connect due to this error :`, err);
    }
}

export default connectDB;