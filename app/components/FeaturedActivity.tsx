import { PodcastsOutlined } from "@mui/icons-material";
import CtaBox from "./CtaBox/CtaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";

type FeaturedActivityProps = {
  activity: any;
  // This will need fleshed out more obviously when I build out the activity block
};

const FeaturedActivity = () => {
  return (
    <div className="bg-pattern-green h-[424px] flex items-center justify-center pt-8">
      <div className="flex flex-row gap-5 container px-4 max-w-[956px] items-center">
        <div className="flex flex-col w-1/2">
          <h2 className="max-w-[70%] mb-4">Get Started With a Brain Game!</h2>
          <p>
            Boost your mind with brain games: fun challenges for sharper
            thinking and cognitive agility!
          </p>
        </div>
        <div className="w-1/2">
          <CtaBox
            image={brainGames}
            header="Target Tracker"
            icon={PodcastsOutlined}
            link={{ href: "google.com", label: "Play Game", isExternal: true }}
          >
            When you&apos;re driving through a busy intersection, how well can
            you track other cars, pedestrians, and everything else moving around
            you? Or if you&apos;re chaperoning a field trip and you&apos;re
            responsible for several children, how easy is it for you to keep an
            eye on all of them at the same time, and make sure none gets into
            too much trouble? Or if you&apos;re playing basketball, soccer, or
            another sport, how well can you keep your eye on the ball and the
            other players all at once?
          </CtaBox>
        </div>
      </div>
    </div>
  );
};

export default FeaturedActivity;
