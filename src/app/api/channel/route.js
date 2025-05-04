import Channel from "../../../model/Channel";
import dbConnect from "../../../lib/dbConnect";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import User from "../../../model/User";

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function POST(request) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const userId = formData.get('userId');
    const name = formData.get('name');
    const description = formData.get('description');
    const banner = formData.get('banner');
    const profile = formData.get('profile');

    // Basic validation
    if (!userId || !name?.trim() || !description?.trim() || !banner || !profile) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 422 }
      );
    }

    // Upload banner to Cloudinary
    const bannerArrayBuffer = await banner.arrayBuffer();
    const bannerBuffer = Buffer.from(bannerArrayBuffer);
    const bannerResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: 'channel_banners',
          resource_type: 'auto' 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(bannerBuffer);
    });

    // Upload profile to Cloudinary
    const profileArrayBuffer = await profile.arrayBuffer();
    const profileBuffer = Buffer.from(profileArrayBuffer);
    const profileResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: 'channel_profiles',
          resource_type: 'auto',
          transformation: [
            { width: 200, height: 200, crop: "thumb", gravity: "face" }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(profileBuffer);
    });

    // Create channel document
    const channel = await Channel.create({
      userId,
      name,
      description,
      banner: {
        url: bannerResult.secure_url,
        publicId: bannerResult.public_id
      },
      profile: {
        url: profileResult.secure_url,
        publicId: profileResult.public_id
      }
    });
      await User.findByIdAndUpdate(userId, {isChannel: true},{ new: true });
    return NextResponse.json(
      { 
        success: true,
        message: 'Channel created successfully', 
        channel 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message.includes('duplicate key') 
          ? 'Channel name already exists' 
          : 'Error creating channel',
        error: error.message 
      },
      { status: 500 }
    );
  }
}