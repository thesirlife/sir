import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    email: string;
    jwt: string;
  }

  interface Token {
    email: string;
    jwt: string;
  }

  interface Session {
    jwt: string;

    user: {
      email: string;
      name: string;
      lastName: string;
      displayName: string;
    };
  }
}
