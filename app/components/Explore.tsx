"use client";

import Link from "next/link";
import { Page } from "../types/page/types";
import CtaBox from "./CtaBox/CtaBox";
import community from "@/app/cta-images/community.jpg";
import badges from "@/app/cta-images/badges.jpg";
import CtaBoxWide from "./CtaBox/CtaBoxWide";

type ExploreProps = {
  // i suck at ts
  topPages: Page[] | Record<any, any>;
};

const Explore = ({ topPages }: ExploreProps) => {
  return (
    <div className="bg-navy-primary pb-14 flex flex-col items-center justify-center">
      <h2 className="text-center pb-8 pt-12 font-bold">
        Explore Something New:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-md:px-4 container">
        {topPages.map((page: Page) => {
          return (
            <Link
              href={page.slug}
              className="col-span-1 md:col-span-2 row-span-1"
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

        <div className="col-span-1 md:col-span-3 row-span-1">
          <CtaBoxWide
            image={community}
            header="SIR Facebook Community"
            onClick={() => console.log("click community")}
            link={{
              href: "",
              label: "Open Community",
              isExternal: true,
            }}
            imageHeight={152}
            imageWidth={152}
          >
            Join other SIR members to discuss the box activities, brain games
            and general learning.
          </CtaBoxWide>
        </div>
        <div className="col-span-1 md:col-span-3 row-span-1">
          <CtaBoxWide
            image={badges}
            header="My Badges"
            link={{
              href: "/my-badges",
              label: "View Badges",
            }}
            imageHeight={152}
            imageWidth={152}
          >
            Explore the badges that you’ve earned by completing games and
            challenges.
          </CtaBoxWide>
        </div>
      </div>
    </div>
  );
};

export default Explore;
