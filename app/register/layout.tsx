import { PropsWithChildren } from "react";
import Header from "../components/global/header";
import { auth } from "@/auth";

const LoggedOutLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default LoggedOutLayout;
