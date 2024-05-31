import { PropsWithChildren } from "react";
import Header from "../components/global/header";
import { auth } from "@/auth";
import LoggedOutFooter from "../components/Register/Footer";

const LoggedOutLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} />
      {children}
      <LoggedOutFooter />
    </>
  );
};

export default LoggedOutLayout;
