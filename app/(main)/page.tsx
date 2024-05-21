import FeaturedActivity from "@/app/components/FeaturedActivity";
import WelcomeBanner from "@/app/components/WelcomeBanner";
import Explore from "@/app/components/Explore";

import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div>
      <WelcomeBanner user="Gavin" />
      <FeaturedActivity />
      <Explore />
    </div>
  );
};

export default Dashboard;
