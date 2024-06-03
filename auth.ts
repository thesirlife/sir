import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
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
