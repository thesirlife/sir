import CtaBox from "./ctaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";
type FeaturedActivityProps = {
  activity: any;
  // This will need fleshed out more obviously when I build out the activity block
};

const FeaturedActivity = () => {
  return (
    <div className="bg-pattern-green h-[424px] flex items-center justify-center">
      <div className="flex flex-row gap-6 container px-4 max-w-[956px]">
        <div className="flex flex-col basis-1/2">
          <h2>Get Started With a Brain Game</h2>
          <p>
            Boost your mind with brain games: fun challenges for sharper
            thinking and cognitive agility!
          </p>
        </div>
        <div className="basis-1/2">
          <CtaBox image={brainGames} header="test" body="test" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedActivity;
