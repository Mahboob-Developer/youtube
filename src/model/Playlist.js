import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    title: {
        type: String,
        required: [true, "Playlist title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
        minlength: [3, "Title must be at least 3 characters"],
        index: 'text' // For text search
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"],
        default: ""
    },
    channelId: {
        type: Schema.Types.ObjectId,
        ref: "Channel",
        required: [true, "Channel ID is required"],
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true
    },
    videos: [{
        videoId: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true
        },
        position: {
            type: Number,
            required: true,
            min: 0
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
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
    visibility: {
        type: String,
        enum: ["public", "private", "unlisted"],
        default: "public"
    },
    isCollaborative: {
        type: Boolean,
        default: false
    },
    collaborators: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    stats: {
        views: {
            type: Number,
            default: 0
        },
        likes: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        }
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for video count
playlistSchema.virtual('videoCount').get(function() {
    return this.videos?.length || 0;
});

// Indexes
playlistSchema.index({ title: 'text', description: 'text' });
playlistSchema.index({ 'videos.videoId': 1 });

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;