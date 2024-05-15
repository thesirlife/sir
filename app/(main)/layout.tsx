import { PropsWithChildren } from "react";
import Header from "../components/global/header";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
