import { Post } from "@/app/types/post/types";
import Filters from "./Filters";

const getArticles = async (): Promise<Post[]> => {
  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts`,
    {
      headers: {
        "Content-Type": "application/json",
        // remove once live and we're not behind wpengine login
        Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
      },
      next: {
        // maybe we'll change, but this'll refetch content after 10 minutes, probably not necessary but a good experience if it changes in wordpress
        revalidate: 6000,
      },
    }
  );
  return await articles.json();
};

const ArticlesList = async () => {
  const articles = await getArticles();
  return (
    <div>
      <Filters />
    </div>
  );
};

export default ArticlesList;
