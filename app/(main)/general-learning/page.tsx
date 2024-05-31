import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import RelatedArticles from "@/app/components/RelatedArticles";
import { Post } from "@/app/types/post/types";

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

  let total: string = "";
  const getArticles = async (): Promise<Post[]> => {
    const articles = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?${
        categories ? `categories=${categories}` : ""
      }&offset=${offset}&per_page=5`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // WP exposes the total number of articles in the headers, so we can use that to calculate pagination/get total number of articles
    total = String(articles.headers.get("X-WP-Total"));
    return await articles.json();
  };

  const articles = await getArticles();
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container">
        <div className="py-10">
          <Breadcrumbs />
        </div>
      </div>
      <RelatedArticles header="Related Articles" />
      <ArticlesList
        articles={articles}
        total={total}
        offset={offset}
        categories={categories}
      />
    </div>
  );
};

export default GeneralLearning;
