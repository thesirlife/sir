import Link from "next/link";
import { Page } from "../types/page/types";
import CtaBox from "./CtaBox/CtaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";

type ExploreProps = {
  // i suck at ts
  topPages: Page[] | Record<any, any>;
};

const Explore = ({ topPages }: ExploreProps) => {
  return (
    <div className="bg-navy-primary pb-8 flex flex-col items-center justify-center">
      <h2 className="text-center py-10">Explore Something New:</h2>
      <div className="grid grid-cols-6 gap-6 container">
        {topPages.map((page: Page) => {
          return (
            <Link
              href={page.slug}
              className="col-span-2 row-span-1"
              key={page.id}
            >
              <CtaBox
                imageOnTop={false}
                imageWidth={
                  page._embedded?.["wp:featuredmedia"][0].media_details.width
                }
                imageHeight={
                  page._embedded?.["wp:featuredmedia"][0].media_details.height
                }
                image={String(
                  page._embedded?.["wp:featuredmedia"][0].source_url
                )}
                header={page.title.rendered}
              >
                {page.excerpt.rendered}
              </CtaBox>
            </Link>
          );
        })}

        <div className="col-span-3 row-span-1">
          <CtaBox image={brainGames} header="Target Tracker">
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
        <div className="col-span-3 row-span-1">
          <CtaBox image={brainGames} header="Target Tracker">
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

export default Explore;
