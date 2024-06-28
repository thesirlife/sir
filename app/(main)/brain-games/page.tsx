import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import RelatedArticles from "@/app/components/RelatedArticles";
import { getBrainGames } from "@/app/data/getBrainGames";
import Image from "next/image";
import BrainHq from "@/app/cta-images/brain-hq.png";

export const metadata = {
  title: "Brain Games",
  description: "Links to brain games by BrainHQ",
};

const BrainGames = async ({
  searchParams,
}: {
  searchParams?: {
    offset?: number;
    categories?: number;
  };
}) => {
  const offset = searchParams?.offset || 0;
  const categories = searchParams?.categories || 0;

  const articles = await getBrainGames({ categories, offset });
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container">
        <div className="flex flex-row items-center justify-between">
          <div className="py-10">
            <Breadcrumbs />
            <h1 className="text-3xl font-bold">Brain Games</h1>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p>Powered By</p>
            <Image src={BrainHq} alt="Powered By Brain HQ" width={160} />
          </div>
        </div>
      </div>
      <RelatedArticles header="Related Articles" type="brain-games" />
      <ArticlesList
        isGame
        articles={articles.articles}
        total={articles.total}
        offset={offset}
        categories={categories}
      />
    </div>
  );
};

export default BrainGames;
