import { PropsWithChildren } from "react";
import Header from "../components/global/header";
import Footer from "../components/global/Footer";
import { auth } from "@/auth";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
