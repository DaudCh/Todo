import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Ensure that email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // Check if user exists and compare password
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return { id: user.id, email: user.email, name: user.name };
          }

          throw new Error('Invalid email or password');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new Error('Error occurred during authorization');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  // Add the user id to the token
        token.email = user.email;  // Ensure email is passed correctly
        token.name = user.name || '';  // Ensure name is added to the token, if it exists
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { 
        id: token.id as string,  // Ensure id is a string
        email: token.email as string,  // Ensure email is a string
        name: token.name as string,  // Ensure name is a string (optional)
      };
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',  // Custom login page URL (ensure you have the page created)
  },
});
