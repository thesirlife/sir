import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // this is where we sign in and get the JWT
      async authorize(credentials, req): Promise<User | null> {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_WPAUTH_ENDPOINT}/token?username=${credentials.email}&password=${credentials.password}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            return null;
          }

          const parsedResponse = await res.json();
          const jwt = parsedResponse.access_token;

          return {
            ...credentials,
            name: parsedResponse.firstName,
            jwt,
          } as User;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
