"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import DailyChecklist from "../DailyChecklist";
import SuperBowl from "../HardCodedForms/SuperBowl";
import { Post } from "@/app/types/post/types";
import CtaBox from "../CtaBox/CtaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";

type FeaturedActivityCarouselProps = {
  article: Post;
  video: Post;
};

const FeaturedActivityCarousel = ({
  article,
  video,
}: FeaturedActivityCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  const handleFocus = (slide?: number) => {
    setCurrentSlide(slide || 0);
  };

  const scrollPrev = useCallback(() => {
    setCurrentSlide((prev) => prev - 1);
    if (api) api.scrollPrev();
  }, [api]);
  const scrollNext = useCallback(() => {
    setCurrentSlide((next) => next + 1);

    if (api) api.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(currentSlide);
  }, [api, currentSlide]);
  return (
    <div className="relative">
      <DailyChecklist
        currentSlide={currentSlide}
        setCurrentSlide={handleFocus}
        className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
      />
      <div className="bg-pattern-green overflow-hidden flex items-center justify-center py-16">
        <div className="flex flex-row gap-5 px-4 items-center">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent className="container ">
              <CarouselItem className="flex justify-center">
                <div className="max-w-[956px] flex flex-col md:flex-row items-center justify-between gap-20 h-full w-full">
                  <h2 className=" mb-4 text-4xl font-bold md:basis-1/2">
                    Test Your Knowledge With Some Quick Trivia!
                  </h2>
                  <div className="flex flex-col basis-1/2">
                    <SuperBowl />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="flex justify-center">
                <div className="max-w-[956px] flex flex-row items-center justify-between gap-20 h-full w-full">
                  <h2 className="text-4xl font-bold md:basis-1/2">
                    {article.title.rendered}
                  </h2>
                  <div className="flex flex-col basis-1/2">
                    <CtaBox
                      header={article.title.rendered}
                      image={
                        article._embedded?.["wp:featuredmedia"][0].source_url ||
                        brainGames
                      }
                      imageOnTop
                      link={{
                        href: `general-learning/${article.slug}`,
                        label: "Read Article",
                      }}
                    >
                      {article.excerpt.rendered}
                    </CtaBox>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="flex justify-center">
                <div className="max-w-[956px] flex flex-row items-center justify-between gap-20 h-full w-full">
                  <h2 className="text-4xl font-bold basis-1/2">
                    {video.title.rendered}
                  </h2>
                  <p>{video.excerpt.rendered}</p>
                  <div className="flex flex-col basis-1/2">
                    <CtaBox
                      header={video.title.rendered}
                      image={
                        article._embedded?.["wp:featuredmedia"][0].source_url ||
                        brainGames
                      }
                      imageOnTop
                      link={{
                        href: `general-learning/${video.slug}`,
                        label: "Watch Video",
                      }}
                    >
                      {video.excerpt.rendered}
                    </CtaBox>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="flex justify-center">
                Feedback
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious onClick={scrollPrev} />
            <CarouselNext onClick={scrollNext} />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FeaturedActivityCarousel;
