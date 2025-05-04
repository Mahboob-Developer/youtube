import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "OTP must be a 6-digit number"],
    },
}, { timestamps: true });

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
