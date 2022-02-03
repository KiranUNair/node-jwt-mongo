import mongoose from 'mongoose';
import { Role } from '../models/role.js';

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo Db connected: ${conn.connection.host}`);
        initializeDb();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const initializeDb = async () => {
    try {
        const result = await Role.estimatedDocumentCount();
        if(result === 0)
            await Role.create([{name: "user"},{name: "moderator"},{name: "admin"}]);
    } catch (err) {
        console.error(err);
    }
    
};

export default connectDb;