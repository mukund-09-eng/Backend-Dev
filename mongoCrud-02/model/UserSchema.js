import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: [25,"Name must contain 25 characters only"]
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: [8,"Password must contain 8 characters atleast"]
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
})

const user = mongoose.model("User",userSchema);

export default user;