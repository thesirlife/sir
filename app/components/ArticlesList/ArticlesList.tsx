import { Post } from "@/app/types/post/types";
import Filters from "./Filters";
import ArticleCard from "../ArticleCard";
import Pagination from "./Pagination";
import getAllGameCategories from "@/app/data/getAllGameCategories";
import getAllCategories from "@/app/data/getAllCategories";
import { auth } from "@/auth";

const ArticlesList = async ({
  offset,
  isGame = false,
  articles,
  categories,
  total = "0",
}: {
  offset: number;
  isGame?: boolean;
  categories: number;
  articles: Post[];
  total: string;
}) => {
  const session = await auth();

  const getCategories = async () => {
    if (isGame) {
      return await getAllGameCategories();
    } else {
      return await getAllCategories();
    }
  };

  const categoryList = await getCategories();

  return (
    <div className="max-w-[662px] w-full  max-md:px-4">
      <Filters categories={categories} categoryList={categoryList} />
      <div className="border-t-2 border-gray-600 container pt-8">
        <p className="text-center pb-8">
          {total} {isGame ? "Games" : "Articles"} Found
        </p>
        <div className="flex flex-col gap-8">
          {session &&
            articles?.map((article) => {
              const tagId =
                article.tags?.length && article.tags?.length > 0
                  ? article.tags[0]
                  : null;
              return (
                <ArticleCard
                  session={session}
                  isGame={isGame}
                  gameUrl={article["game_link"] || ""}
                  tagId={tagId}
                  url={article.slug}
                  imageId={article.featured_media}
                  header={article.title.rendered}
                  key={article.id}
                  description={article.excerpt.rendered}
                />
              );
            })}
          <div className="flex flex-row justify-center">
            <Pagination total={total} offset={offset} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
