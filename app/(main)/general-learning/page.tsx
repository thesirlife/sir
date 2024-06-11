import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import RelatedArticles from "@/app/components/RelatedArticles";
import getPosts from "@/app/data/getPosts";

const GeneralLearning = async ({
  searchParams,
}: {
  searchParams?: {
    offset?: number;
    categories?: number;
  };
}) => {
  const offset = searchParams?.offset || 0;
  const categories = searchParams?.categories || 0;

  const articles = await getPosts({ categories, offset });
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container">
        <div className="py-10">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold">General Learning</h1>
        </div>
      </div>
      <RelatedArticles header="Related Articles" type="general-learning" />
      <ArticlesList
        articles={articles.articles}
        total={articles.total}
        offset={offset}
        categories={categories}
      />
    </div>
  );
};

export default GeneralLearning;
