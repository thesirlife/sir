import { OpenInNew } from "@mui/icons-material";
import { auth } from "@/auth";
import getStickyPosts from "../data/getStickyPosts";
import ArticleCard from "./ArticleCard";
import Button from "./global/Button";
import getPostsByTag from "../data/getPostsByTag";
import { Post } from "../types/post/types";

type RelatedArticlesProps = {
  header: string;
  type: "general-learning" | "brain-games";
  isLoggedIn?: boolean;
  isHome?: boolean;
};

const RelatedArticles = async ({
  header,
  type,
  isLoggedIn,
  isHome = false,
}: RelatedArticlesProps) => {
  let articles: Post[] = [];

  isHome
    ? (articles = await getPostsByTag({ tag: 25 }))
    : (articles = await getStickyPosts(type));

  const session = await auth();

  return (
    <div className="py-20 bg-green-primary w-full max-md:px-4">
      <div className="flex flex-col items-center">
        <h2 className="mb-6 font-bold max-w-[600px] text-center">{header}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  container">
          {session &&
            articles?.map((article) => {
              return (
                <ArticleCard
                  key={article.id}
                  session={session}
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
        {!isLoggedIn ? (
          <Button
            color="warning"
            endIcon={<OpenInNew />}
            variant="contained"
            className="mt-6"
            href="/enter-box-code"
          >
            Sign Up Now
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default RelatedArticles;
