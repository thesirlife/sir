import FeaturedActivity from "@/app/components/featuredActivity";
import WelcomeBanner from "@/app/components/welcomeBanner";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div>
      <WelcomeBanner user="Gavin" />
      <FeaturedActivity />
    </div>
  );
};

export default Dashboard;
