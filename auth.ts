import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthResponse = {
  success: boolean;
  statusCode: number;
  code: string;
  message: string;
  data: {
    token: string;
    id: number;
    email: string;
    nicename: string;
    firstName: string;
    lastName: string;
    displayName: string;
  };
};

export const authOptions: NextAuthConfig = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.jwt = user.jwt;
      }

      return token;
    },
    session({ session, token }) {
      session.user.name = token.name as string;
      session.user.jwt = token.jwt as string;

      // @ts-ignore
      // This is bad, but I don't have the patience to properly type this right now.
      session.user.id = token.id;
      session.user.jwt = token.jwt as string;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
  },

	session: {
		maxAge: 1440, // 24 hours
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

          const parsedResponse: AuthResponse = await res.json();
          const jwt = parsedResponse.data.token;

          return {
            ...credentials,
            name: parsedResponse.data.firstName,
            id: String(parsedResponse.data.id),
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
