import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    email: string;
    id: number;
    jwt: string;
  }

  interface Token {
    email: string;
    id: number;
    jwt: string;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      jwt: string;
      name: string;
      lastName: string;
      displayName: string;
    };
  }
}
