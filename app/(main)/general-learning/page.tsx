import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import RelatedArticles from "@/app/components/RelatedArticles";
import { Post } from "@/app/types/post/types";

const GeneralLearning = async ({
  searchParams,
}: {
  searchParams?: {
    page?: number;
  };
}) => {
  const page = searchParams?.page || 1;

  let total: string = "";
  const getArticles = async (): Promise<Post[]> => {
    const articles = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?per_page=5&page=${page}`,
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
    <>
      <RelatedArticles header="Related Articles" />
      <ArticlesList page={page} articles={articles} total={total} />
    </>
  );
};

export default GeneralLearning;
