import { PropsWithChildren } from "react";
import Header from "../components/global/header";
import { auth } from "@/auth";
import LoggedOutFooter from "../components/Register/Footer";

const LoggedOutLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col items-between justify-between bg-auth">
      <Header isLoggedIn={Boolean(session?.user.email)} />
      {children}
      <LoggedOutFooter />
    </div>
  );
};

export default LoggedOutLayout;
