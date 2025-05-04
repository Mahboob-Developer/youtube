import NextAuth from 'next-auth';
import authOptions from './option'; // Import the authOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Handle both GET and POST requests for NextAuth
    