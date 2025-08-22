import mongoose from "mongoose"
import {SERVER_CONFIG} from './serverConfig.js'

export const connectDB = async()=>{
    try{
        mongoose.connect(SERVER_CONFIG.Mongo_URI);
        console.log("MongoDB connected");
    }
    catch(err)
    {
        console.log("Database is not connected");
        process.exit(1);
    }
}
