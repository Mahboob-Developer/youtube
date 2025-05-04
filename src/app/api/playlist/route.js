import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from "../../../model/User";
import Playlist from '../../../model/Playlist';
import { v2 as cloudinary } from 'cloudinary';
import Channel from '../../..//model/Channel.js';

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function GET(request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const channelId = searchParams.get('channelId');
        
        if (!channelId) {
            return NextResponse.json(
                { message: 'Channel ID is required' },
                { status: 400 }
            );
        }

        const playlists = await Playlist.find({ channelId })
            .sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, data: playlists },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        
        const formData = await request.formData();
        const userId = formData.get('userId');
        const title = formData.get('title');
        const description = formData.get('description');
        const thumbnail = formData.get('thumbnail');

        // Validation
        if (!userId || !title?.trim() || !thumbnail) {
            return NextResponse.json(
                { message: 'Required fields are missing' },
                { status: 422 }
            );
        }

        // Verify user and channel ownership
        const user = await User.findById(userId);
        if (!user?.isChannel) {
            return NextResponse.json(
                { message: 'User is not a channel owner' },
                { status: 403 }
            );
        }
        const channel = await Channel.findOne({ userId: userId });
        if (!channel) {
            return NextResponse.json(
                { message: 'Channel not found' },
                { status: 403 }
            );
        }
        // Upload thumbnail to Cloudinary
        const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
        const thumbnailResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { 
                    folder: 'playlist_thumbnails',
                    transformation: [
                        { width: 320, height: 180, crop: "fill" }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(thumbnailBuffer);
        });

        // Create playlist
        const playlist = await Playlist.create({
            title,
            description,
            userId,
            channelId:channel._id,
            thumbnail: {
                url: thumbnailResult.secure_url,
                publicId: thumbnailResult.public_id
            },
        });

        return NextResponse.json(
            { 
                success: true,
                message: 'Playlist created successfully',
                data: playlist 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Playlist creation error:', error);
        return NextResponse.json(
            { 
                success: false,
                message: error.code === 11000 
                    ? 'Playlist with this title already exists' 
                    : 'Failed to create playlist',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}