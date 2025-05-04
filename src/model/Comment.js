import mongoose,{Schema} from "mongoose";
const commentSchema = new Schema({
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
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;