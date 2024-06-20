import getStickyPosts from "../data/getStickyPosts";
import ArticleCard from "./ArticleCard";

type RelatedArticlesProps = {
  header: string;
  type: "general-learning" | "brain-games";
};

const RelatedArticles = async ({ header, type }: RelatedArticlesProps) => {
  const articles = await getStickyPosts(type);

  return (
    <div className="py-20 bg-green-primary w-full max-md:px-4">
      <div className="flex flex-col items-center">
        <h2 className="mb-6">{header}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  container">
          {articles.map((article) => {
            const hasImage = Boolean(article._embedded?.["wp:featuredmedia"]);
            return (
              <ArticleCard
                key={article.id}
                header={article.title.rendered}
                imageWidth={
                  hasImage
                    ? article._embedded?.["wp:featuredmedia"][0].media_details
                        .width
                    : 0
                }
                imageHeight={
                  hasImage
                    ? article._embedded?.["wp:featuredmedia"][0].media_details
                        .height
                    : 0
                }
                image={
                  hasImage
                    ? String(
                        article._embedded?.["wp:featuredmedia"][0].source_url
                      )
                    : ""
                }
                imageId={article.featured_media}
                url={article.slug}
                isGame={type === "brain-games"}
                gameUrl={article["game_link"]}
                className="w-full col-span-1"
                imageOnTop
                description={article.excerpt.rendered}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
