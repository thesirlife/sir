import WelcomeBanner from "@/app/components/WelcomeBanner";
import Explore from "@/app/components/Explore";
import FeaturedActivityCarousel from "@/app/components/FeaturedActivityCarousel/Carousel";
import { Suspense } from "react";
import RelatedArticles from "../components/RelatedArticles";
import { CircularProgress } from "@mui/material";
import { auth } from "@/auth";
import OnboardingModal from "../components/OnboardingModal";
import getRandomArticle from "../data/getRandomArticle";
import getMediaById from "../data/getMediaById";
import getTagById from "../data/getTagById";
import getRandomVideo from "../data/getRandomVideo";

const Dashboard = async ({
  searchParams,
}: {
  searchParams?: {
    newUser?: boolean;
  };
}) => {
  const session = await auth();
  const firstLogin = searchParams?.newUser;

  const name = session?.user.name
    ? session?.user.name
    : session?.user.email || "";

  const article = await getRandomArticle();
  const video = await getRandomVideo();

  return (
    <div>
      {firstLogin ? <OnboardingModal /> : null}
      <WelcomeBanner user={name} />
      <FeaturedActivityCarousel article={article} video={video} />
      <Suspense fallback={<CircularProgress />}>
        <Explore />
        <RelatedArticles header="Summer Box" />
      </Suspense>
    </div>
  );
};

export default Dashboard;
