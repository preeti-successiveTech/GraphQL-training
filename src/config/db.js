import mongoose from "mongoose"
import { SERVER_CONFIG } from "./serverConfig";

export const connectDB = async()=>{
    try{
        mongoose.connect(SERVER_CONFIG.Mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
        console.log("MongoDB connected");
    }
    catch(err)
    {
        console.log("Database is not connected");
        process.exit(1);
    }
}
