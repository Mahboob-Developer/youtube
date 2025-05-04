import mongoose ,{Schema} from "mongoose";
const viewSchema = new Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true });
const View = mongoose.model("View", viewSchema);
export default View;