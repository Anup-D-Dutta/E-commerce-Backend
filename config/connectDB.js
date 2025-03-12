// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config()

// if(!process.env.MONGODB_URI){
//     throw new Error(
//         "Please provide MONGODB_URI in the .env file"
//     )
// }

// async function connectDB(){
//     try {
//         await mongoose.connect(process.env.MONGODB_URI)
//         console.log("connect DB")
//     } catch (error) {
//         console.log("Mongodb connect error",error)
//         process.exit(1)
//     }
// }

// export default connectDB


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGODB_URI ? "Loaded" : "Not Loaded");

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
