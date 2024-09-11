import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
    await mongoose.connect(process.env.URI).then((res) => {
        console.log("mongoDB connected successfully");

    })   
}

export default connectToDB;
