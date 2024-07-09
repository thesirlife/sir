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
					console.log(parsedResponse);
          const jwt = parsedResponse.data.token;
					console.log(jwt);

					// Immediately request a refresh token for the 30 day expiration
					// Default initial JWT token expires in 10 minutes
					// const result = await fetch(
          //   `${process.env.NEXT_PUBLIC_WPAUTH_ENDPOINT}/token?refresh_token=${jwt}`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
					// 			Authorization: `Bearer ${jwt}`,
          //     },
          //   }
          // );
					// console.log(result);

					// if (!result.ok) {
					// 	return null;
          // }

          // const parsedResult: AuthResponse = await result.json();
					// console.log(parsedResult);
          // const refreshedJwt = parsedResult.data.token;
					// console.log(refreshedJwt);

          return {
            ...credentials,
            name: parsedResponse.data.firstName,
            id: String(parsedResponse.data.id),
            jwt: jwt,
          } as User;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
