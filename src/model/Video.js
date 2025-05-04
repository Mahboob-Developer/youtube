import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    channelId: {
        type: Schema.Types.ObjectId,
        ref: "Channel",
        required: [true, "Channel ID is required"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
        minlength: [5, "Title must be at least 5 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [5000, "Description cannot exceed 5000 characters"],
        default: ""
    },
    // Cloudinary references
    thumbnail: {
        publicId: {
            type: String,
            required: [true, "Thumbnail public ID is required"]
        },
        url: {
            type: String,
            required: [true, "Thumbnail URL is required"]
        },
        version: String
    },
    video: {
        publicId: {
            type: String,
            required: [true, "Video public ID is required"]
        },
        url: {
            type: String,
            required: [true, "Video URL is required"]
        },
        version: String,
        duration: {
            type: Number, // in seconds
            required: [true, "Duration is required"]
        },
        format: String,
        resolution: {
            width: Number,
            height: Number
        }
    },
    category: {
        type: String,
        enum: [
            'Education', 'Entertainment', 'Gaming', 
            'Music', 'News', 'Sports', 'Technology',
            'Travel', 'Food', 'Lifestyle', 'Other'
        ],
        default: 'Other'
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'unlisted'],
        default: 'public'
    },
    isPlaylist: {
        type: Boolean,
        default: false
    },
    playlistId: {
        type: Schema.Types.ObjectId,
        ref: "Playlist"
    },
    // Engagement metrics
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    // Moderation
    isApproved: {
        type: Boolean,
        default: true
    },
    ageRestricted: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true
});

const Video = mongoose.model("Video", videoSchema);
export default Video;