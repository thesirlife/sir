import { Post } from "@/app/types/post/types";
import Filters from "./Filters";
import ArticleCard from "../ArticleCard";
import brainGames from "@/app/cta-images/brain-games.jpg";
import { PodcastsOutlined } from "@mui/icons-material";
import Pagination from "./Pagination";

const getArticles = async (): Promise<Post[]> => {
  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?per_page=5&_embed`,
    {
      headers: {
        "Content-Type": "application/json",
        // remove once live and we're not behind wpengine login
        Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
      },
    }
  );
  return await articles.json();
};

const ArticlesList = async () => {
  const articles = await getArticles();

  return (
    <div className="max-w-[662px]">
      <Filters />
      <div className="border-t-2 border-gray-600 container pt-8">
        <p className="text-center pb-8">{articles.length} Articles Found</p>
        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <ArticleCard
              icon={PodcastsOutlined}
              tagId={article.tags.length > 0 ? article.tags[0] : null}
              // Still not sure which image solution will wind up working best
              // image={
              //   article._embedded &&
              //   article._embedded["wp:featuredmedia"] &&
              //   article._embedded["wp:featuredmedia"][0].source_url
              //     ? article._embedded["wp:featuredmedia"][0].source_url
              //     : ""
              // }
              imageId={article.featured_media}
              header={article.title.rendered}
              key={article.id}
              description={article.excerpt.rendered}
            />
          ))}
          <div className="flex flex-row justify-center">
            <Pagination
              color="standard"
              count={Math.ceil(articles.length / 5)}
              page={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
