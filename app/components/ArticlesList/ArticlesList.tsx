import { Post } from "@/app/types/post/types";
import Filters from "./Filters";
import ArticleCard from "../ArticleCard";
import { PodcastsOutlined } from "@mui/icons-material";
import Pagination from "./Pagination";

const ArticlesList = async ({ page }: { page: number }) => {
  let total: string = "";
  const getArticles = async (): Promise<Post[]> => {
    const articles = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?per_page=5&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          // remove once live and we're not behind wpengine login
          Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
        },
      }
    );
    // WP exposes the total number of articles in the headers, so we can use that to calculate pagination/get total number of articles
    total = String(articles.headers.get("X-WP-Total"));
    return await articles.json();
  };
  const articles = await getArticles();

  return (
    <div className="max-w-[662px]">
      <Filters />
      <div className="border-t-2 border-gray-600 container pt-8">
        <p className="text-center pb-8">{total} Articles Found</p>
        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <ArticleCard
              icon={PodcastsOutlined}
              tagId={article.tags.length > 0 ? article.tags[0] : null}
              imageId={article.featured_media}
              header={article.title.rendered}
              key={article.id}
              description={article.excerpt.rendered}
            />
          ))}
          <div className="flex flex-row justify-center">
            <Pagination total={total} page={page} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
