import mongoose,{Schema} from "mongoose";
const subscribeSchema = new Schema({
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
const Subscribe = mongoose.model("Subscribe", subscribeSchema);
export default Subscribe;