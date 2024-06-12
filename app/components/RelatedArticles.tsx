import getStickyPosts from "../data/getStickyPosts";
import CtaBox from "./CtaBox/CtaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";

type RelatedArticlesProps = {
  header: string;
  type: "general-learning" | "brain-games";
};

const RelatedArticles = async ({ header, type }: RelatedArticlesProps) => {
  const articles = await getStickyPosts(type);

  return (
    <div className="py-20 bg-green-primary w-full">
      <div className="flex flex-col items-center">
        <h2 className="mb-6">{header}</h2>
        <div className="grid grid-cols-3 gap-6 container">
          {articles.map((article) => {
            return (
              <CtaBox
                key={article.id}
                header={article.title.rendered}
                image={brainGames}
                boxlink={`/general-learning/${article.slug}`}
                className="w-full col-span-1"
              >
                {article.excerpt.rendered}
              </CtaBox>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
