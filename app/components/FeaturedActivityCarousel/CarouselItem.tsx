import { PodcastsOutlined } from "@mui/icons-material";
import brainGames from "@/app/cta-images/brain-games.jpg";
import CtaBox from "../CtaBox/CtaBox";

type CarouselItemProps = {
  heading: string;
};

const CarouselItem = ({
  heading = "Get Started With a Brain Game!",
}: CarouselItemProps) => {
  return (
    <div>
      <div className="flex flex-col w-1/2">
        <h2 className="max-w-[70%] mb-4">{heading}</h2>
      </div>
      <div className="w-1/2">
        <CtaBox
          image={brainGames}
          header="Target Tracker"
          icon={PodcastsOutlined}
          link={{ href: "google.com", label: "Play Game", isExternal: true }}
        >
          When you&apos;re driving through a busy intersection, how well can you
          track other cars, pedestrians, and everything else moving around you?
          Or if you&apos;re chaperoning a field trip and you&apos;re responsible
          for several children, how easy is it for you to keep an eye on all of
          them at the same time, and make sure none gets into too much trouble?
          Or if you&apos;re playing basketball, soccer, or another sport, how
          well can you keep your eye on the ball and the other players all at
          once?
        </CtaBox>
      </div>
    </div>
  );
};

export default CarouselItem;
