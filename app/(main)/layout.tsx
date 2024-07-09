import { PropsWithChildren } from "react";
import Header from "../components/global/header";
import Footer from "../components/global/Footer";
import { auth } from "@/auth";
import LoggedOutFooter from "../components/Register/Footer";
const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} />
      {children}
      {session?.user.email ? <Footer /> : <LoggedOutFooter />}
    </>
  );
};

export default MainLayout;
