import CtaBox from "./CtaBox/CtaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";

type RelatedArticlesProps = {
  header: string;
  // eventually this will be an array of articles that will dynamically be fed in
  articles?: any[];
};

const RelatedArticles = ({ header }: RelatedArticlesProps) => {
  return (
    <div className="py-20 bg-green-primary w-full">
      <div className="flex flex-col items-center">
        <h2 className="mb-6">{header}</h2>
        <div className="grid grid-cols-3 gap-6 container">
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
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
