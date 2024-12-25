// next-auth.d.ts


import { DefaultSession } from "next-auth";

// Extend the default session and user type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;  // Add id to the user object in the session
      email: string;  // Ensure email is a string
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;  // Add id to the user object
    email: string;  // Ensure email is a string
  }

  interface JWT {
    id: string; // Add id to the JWT token
    email: string; // Ensure email is a string
  }
}
