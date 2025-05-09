import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,

        required: [true, "User Name is required"],
    },
    email: {
        type: String,

        trim: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
        unique: true,
        lowercase: true,
        required: [true, "User Email is required"],
    },
    password: {
        type: String,

        trim: true,
        required: [true, "User Password is required"],
        minLength: 6,
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
