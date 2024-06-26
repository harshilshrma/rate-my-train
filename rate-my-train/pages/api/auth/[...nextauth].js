// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Other providers like Facebook, GitHub, etc., can be added here
    ],
    // Optional SQL or MongoDB database to persist users
    // database: process.env.DATABASE_URL,
});
