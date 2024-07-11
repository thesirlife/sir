import WelcomeBanner from "@/app/components/WelcomeBanner";
import Explore from "@/app/components/Explore";
import FeaturedActivityCarousel from "@/app/components/FeaturedActivityCarousel/Carousel";
import RelatedArticles from "../components/RelatedArticles";
import { auth } from "@/auth";
import OnboardingModal from "../components/OnboardingModal";
import getRandomArticle from "../data/getRandomArticle";
import getRandomVideo from "../data/getRandomVideo";
import getTrivia from "../data/getTrivia";
import getPage from "../data/getPage";
import { redirect } from "next/navigation";
import getAuthJwt from "../data/getAuthJwt";

const Dashboard = async ({
  searchParams,
}: {
  searchParams?: {
    newUser?: boolean;
  };
}) => {
  const session = await auth();
  if (!session?.user.email) {
    redirect("/enter-box-code");
  }
  const firstLogin = searchParams?.newUser;

  const name = session?.user.name
    ? session?.user.name
    : session?.user.email || "";

  const article = await getRandomArticle();
  const video = await getRandomVideo();
  const trivia = await getTrivia();
  const brainGamesPage = await getPage("29");
  const generalLearningPage = await getPage("27");
  const aiPage = await getPage("31");
  const jwt = await getAuthJwt();

  return (
    <div>
      {firstLogin ? <OnboardingModal /> : null}
      <WelcomeBanner user={name} />
      <FeaturedActivityCarousel
        article={article}
        video={video}
        trivia={trivia}
      />
      <Explore
        topPages={[brainGamesPage, generalLearningPage, aiPage]}
        userId={Number(session?.user.id)}
        jwt={jwt}
      />
      <RelatedArticles
        header="SIR Welcome Box"
        type="general-learning"
        isLoggedIn={Boolean(session)}
      />
    </div>
  );
};

export default Dashboard;
