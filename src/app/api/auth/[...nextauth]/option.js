import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import dbConnect from "../../../../lib/dbConnect.js";
import User from "../../../../model/User.js";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        const { email, password } = credentials;

        // Check if both email and password are provided
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        // Find user by email
        const user = await User.findOne({ email });

        // If user is not found
        if (!user) {
          throw new Error('No user found with that email');
        }

        // Check if the account is verified
        if (!user.isVerify) {
          throw new Error('Please verify your account first');
        }

        // Compare provided password with stored hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        // Return user details for NextAuth session
        return {
           id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.profileImageUrl,
            username: user.username,
            isVerify: user.isVerify,
            isChannel: user.isChannel
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
        token.image = user.image;
        token.isVerify = user.isVerify;
        token.isChannel = user.isChannel;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.image = token.image;
      session.user.isVerify = token.isVerify;
      session.user.isChannel = token.isChannel;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

export default authOptions;
