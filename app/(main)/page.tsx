import WelcomeBanner from "@/app/components/WelcomeBanner";
import Explore from "@/app/components/Explore";
import FeaturedActivityCarousel from "@/app/components/FeaturedActivityCarousel/Carousel";
import { FC, Suspense } from "react";
import RelatedArticles from "../components/RelatedArticles";
import { CircularProgress } from "@mui/material";
import { auth } from "@/auth";
import OnboardingModal from "../components/OnboardingModal";

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

  return (
    <div>
      {firstLogin ? <OnboardingModal /> : null}
      <WelcomeBanner user={name} />
      <FeaturedActivityCarousel />
      <Explore />
      <Suspense fallback={<CircularProgress />}>
        <RelatedArticles header="Summer Box" />
      </Suspense>
    </div>
  );
};

export default Dashboard;
