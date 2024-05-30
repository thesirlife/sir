import { Post } from "@/app/types/post/types";
import Filters from "./Filters";
import ArticleCard from "../ArticleCard";
import { PodcastsOutlined } from "@mui/icons-material";
import Pagination from "./Pagination";

const ArticlesList = async ({
  offset,
  articles,
  categories,
  total,
}: {
  offset: number;
  categories: number;
  articles: Post[];
  total: string;
}) => {
  return (
    <div className="max-w-[662px] w-full">
      <Filters categories={categories} />
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
            <Pagination total={total} offset={offset} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
