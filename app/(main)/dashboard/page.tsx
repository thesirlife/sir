import WelcomeBanner from "@/app/components/welcomeBanner";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div>
      <WelcomeBanner user="Gavin" />
    </div>
  );
};

export default Dashboard;
