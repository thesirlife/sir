import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import RelatedArticles from "@/app/components/RelatedArticles";
import { getBrainGames } from "@/app/data/getBrainGames";

import { auth } from "@/auth"

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

	// @TODO :: Redirect user to /login if not logged in
	const session = await auth();
  if (!session) return <div>Not authenticated</div>

  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container">
        <div className="py-10">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold">Brain Games</h1>
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
