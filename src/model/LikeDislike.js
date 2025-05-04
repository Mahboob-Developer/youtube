import mongoose,{Schema} from "mongoose";
const likeDislikeSchema = new Schema({
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
    isLike:{
        type:Boolean,
        default:false
    },
    isDislike:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });