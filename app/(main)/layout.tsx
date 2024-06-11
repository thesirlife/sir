import { PropsWithChildren } from "react";
import Header from "../components/global/header";
import Footer from "../components/global/Footer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (!session?.user.email) {
    redirect("/enter-box-code");
  }

  // console.log(session);

  return (
    <>
      <Header isLoggedIn={Boolean(session?.user.email)} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
