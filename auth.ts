import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "SIR",

      // The credentials are used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

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

          // accessing the jwt returned by server
          const jwt = parsedResponse.access_token;

          // You can make more request to get other information about the user eg. Profile details

          // return user credentials together with jwt
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
