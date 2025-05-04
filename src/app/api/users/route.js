// src/app/api/connect/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect.js';
import User from "../../../model/User.js";
import bcrypt from 'bcrypt';
import { uid } from 'uid';

const saltRounds = 10;

// Handle GET requests
export async function GET() {
  try {
    await dbConnect();
    const data = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ status: true, success: true, data });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json(
      { message: 'Database connection failed', error: error.message },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json(); // ✅ Only call once
    const { name, email, mobile, password, country } = body;

    // Check for missing fields
    if (!name || !email || !mobile || !password || !country) {
      return NextResponse.json({ status: 422, message: 'All fields are required.' });
      }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Generate username
    const trimmedName = name.trim();
    const limitedName = trimmedName.slice(0, 4);
    const number = uid(4, { characters: '0123456789' });
    const username = `${limitedName.charAt(0).toUpperCase()}${limitedName
      .slice(1)
      .toLowerCase()}${number}`;

    // Check if user already exists by email OR mobile
    const existingUser = await User.findOne({
        $or: [{ email }, { mobile }],
        });

    if (existingUser) {
      body.id = existingUser._id;
        if (existingUser.isVerify) {
            return NextResponse.json({
            status: 409,
            message: 'User already exists.',
            });
        } else {
            // Update the existing unverified user
            existingUser.username = username;
            existingUser.email = email;
            existingUser.mobile = mobile;
            existingUser.country = country !== '' ? country : 'India';
            existingUser.password = hashedPassword;

            await existingUser.save(); // ✅ await to ensure DB update completes
        }
        } else {
        // If user doesn't exist at all, create new
        const newUser = new User({
            username,
            name,
            email,
            mobile,
            country: country !== '' ? country : 'India',
            password: hashedPassword,
        });

      const newuservalue=await newUser.save();
            body.id = newuservalue._id;
        }


    return NextResponse.json(
      {status:201, message: 'Check your mail and verify it.', user: body });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { message: 'Error processing request', error: error.message },
      { status: 500 }
    );
  }
}
