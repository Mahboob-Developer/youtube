import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect.js';
import User from '../../../model/User.js';
import Video from "../../../model/Video.js";
import { uid } from 'uid';
import { getToken } from 'next-auth/jwt';


export const config = {
    api: {
      bodyParser: false,
    },
  };
  cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

async function uploadToCloudinary(fileBuffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(fileBuffer);
  });
}

const uidGenerator = () => {
  const result = uid(10);
  const date = new Date().getTime();
  return result + date.toString();
};

export async function POST(request) {
  try {
    await dbConnect();
    const token = await getToken({ req: request });
    if (!token || !token.id) {
      return NextResponse.json({ message: 'Unauthorized' ,data:token}, { status: 401 });
    }

    const isUser = await User.findById(token.id);
    if (!isUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('video');
    const thumbnail = formData.get('thumbnail');
    const { title, description } = Object.fromEntries(formData);

    if (!file || !thumbnail) {
      return NextResponse.json({ message: 'Video or thumbnail not uploaded' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const thumbnailBuffer = await thumbnail.arrayBuffer();

    const videoUpload = await uploadToCloudinary(Buffer.from(fileBuffer), {
      resource_type: 'video',
      folder: 'videos',
      public_id: uidGenerator(),
    });

    const thumbnailUpload = await uploadToCloudinary(Buffer.from(thumbnailBuffer), {
      resource_type: 'image',
      folder: 'thumbnails',
      public_id: uidGenerator(),
    });

    const videoData = await Video.create({
      userId: isUser._id,
      title,
      description,
      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbnailUpload.secure_url,
      thumbnailId: thumbnailUpload.public_id,
      videoId: videoUpload.public_id,
      duration: videoUpload.duration,
    });

    return NextResponse.json(
      {
        message: 'File uploaded successfully',
        file: videoUpload,
        thumbnail: thumbnailUpload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ message: 'Error uploading video', error: error.message }, { status: 500 });
  }
}
