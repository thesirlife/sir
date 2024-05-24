import WelcomeBanner from "@/app/components/WelcomeBanner";
import Explore from "@/app/components/Explore";
import FeaturedActivity from "@/app/components/FeaturedActivity";

import { FC } from "react";
import RelatedArticles from "../components/RelatedArticles";
import DailyChecklist from "../components/DailyChecklist";

const Dashboard: FC = () => {
  return (
    <div>
      <WelcomeBanner user="Gavin" />

      <div className="relative">
        <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2">
          <DailyChecklist />
        </div>
        <FeaturedActivity />
      </div>

      <Explore />
      <RelatedArticles header="Summer Box" />
    </div>
  );
};

export default Dashboard;
