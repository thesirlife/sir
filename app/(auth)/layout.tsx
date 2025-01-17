import { PropsWithChildren } from "react";
import { auth } from "@/auth";
import LoggedOutFooter from "../components/Register/Footer";

const LoggedOutLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col items-between justify-between bg-auth bg-cover">
      {children}
      <LoggedOutFooter />
    </div>
  );
};

export default LoggedOutLayout;
