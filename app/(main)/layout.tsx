import { PropsWithChildren } from "react";
import Header from "../components/global/header";
import Footer from "../components/global/Footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  // if user not logged in, redirect to register flow
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
