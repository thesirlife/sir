import WelcomeBanner from "@/app/components/WelcomeBanner";
import Explore from "@/app/components/Explore";
import FeaturedActivityCarousel from "@/app/components/FeaturedActivityCarousel/Carousel";
import { FC, Suspense } from "react";
import RelatedArticles from "../components/RelatedArticles";
import DailyChecklist from "../components/DailyChecklist";
import { CircularProgress } from "@mui/material";

const Dashboard: FC = async () => {
  return (
    <div>
      <WelcomeBanner user="Gavin" />
      <div className="relative">
        <DailyChecklist className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2" />
        <FeaturedActivityCarousel />
      </div>
      <Explore />
      <Suspense fallback={<CircularProgress />}>
        <RelatedArticles header="Summer Box" />
      </Suspense>
    </div>
  );
};

export default Dashboard;
