import getStickyPosts from "../data/getStickyPosts";
import CtaBox from "./CtaBox/CtaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";

type RelatedArticlesProps = {
  header: string;
  type: "general-learning" | "brain-games";
};

const RelatedArticles = async ({ header, type }: RelatedArticlesProps) => {
  const articles = await getStickyPosts(type);

  console.log(articles);

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
                boxLink={`/general-learning/${article.slug}`}
                className="w-full col-span-1"
              >
                {article.excerpt.rendered}
              </CtaBox>
            );
          })}
          {/* <CtaBox
            header="Video Title"
            image={brainGames}
            className="w-full col-span-1"
          >
            When you&apos;re driving through a busy intersection, how well can
            you track other cars, pedestrians, and everything else moving around
            you? Or if you&apos;re chaperoning
          </CtaBox>
          <CtaBox
            header="Video Title"
            image={brainGames}
            className="w-full col-span-1"
          >
            When you&apos;re driving through a busy intersection, how well can
            you track other cars, pedestrians, and everything else moving around
            you? Or if you&apos;re chaperoning
          </CtaBox>
          <CtaBox
            header="Video Title"
            image={brainGames}
            className="w-full col-span-1"
          >
            When you&apos;re driving through a busy intersection, how well can
            you track other cars, pedestrians, and everything else moving around
            you? Or if you&apos;re chaperoning
          </CtaBox> */}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
