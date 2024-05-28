import { PropsWithChildren } from "react";
import Header from "@/app/components/global/header";
import Footer from "@/app/components/global/Footer";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

const GeneralLearningLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container">
        <div className="py-10">
          <Breadcrumbs />
        </div>
      </div>
      {children}
    </div>
  );
};

export default GeneralLearningLayout;
