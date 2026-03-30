import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connection Done");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;