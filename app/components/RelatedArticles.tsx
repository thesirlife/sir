import { OpenInNew } from "@mui/icons-material";
import getStickyPosts from "../data/getStickyPosts";
import ArticleCard from "./ArticleCard";
import Button from "./global/Button";

type RelatedArticlesProps = {
  header: string;
  type: "general-learning" | "brain-games";
  isLoggedIn?: boolean;
};

const RelatedArticles = async ({ header, type }: RelatedArticlesProps) => {
  const articles = await getStickyPosts(type);

  return (
    <div className="py-20 bg-green-primary w-full max-md:px-4">
      <div className="flex flex-col items-center">
        <h2 className="mb-6 font-bold max-w-[600px] text-center">{header}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  container">
          {articles.map((article) => {
            return (
              <ArticleCard
                key={article.id}
                header={article.title.rendered}
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
        <Button
          color="warning"
          endIcon={<OpenInNew />}
          variant="contained"
          className="mt-6"
          href="/enter-box-code"
        >
          Sign Up Now
        </Button>
      </div>
    </div>
  );
};

export default RelatedArticles;
