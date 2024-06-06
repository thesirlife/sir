"use client";

import { useEffect, useState } from "react";
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
import ArticleCard from "../ArticleCard";
import Link from "next/link";

type FeaturedActivityCarouselProps = {
  article: Post;
};

const FeaturedActivityCarousel = ({
  article,
}: FeaturedActivityCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  const handleFocus = (slide?: number) => {
    setCurrentSlide(slide || 0);
  };

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
      <div className="bg-pattern-green  flex items-center justify-center py-16">
        <div className="flex flex-row gap-5 container px-4  items-center">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              <CarouselItem className="flex justify-center">
                <div className="max-w-[956px] flex flex-row items-center justify-between gap-20 h-full">
                  <h2 className=" mb-4 text-4xl font-bold w-1/2">
                    Test Your Knowledge With Some Quick Trivia!
                  </h2>
                  <div className="flex flex-col w-1/2">
                    <SuperBowl />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="max-w-[956px] flex flex-row items-center justify-between gap-20 h-full">
                  <h2 className="text-4xl font-bold w-1/2">
                    {article.title.rendered}
                  </h2>
                  <p>{article.excerpt.rendered}</p>
                  <div className="flex flex-col w-1/2">
                    <Link href={article.slug}>
                      <ArticleCard
                        header={article.title.rendered}
                        description={article.excerpt.rendered}
                        imageId={article.featured_media}
                      />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>Video</CarouselItem>
              <CarouselItem>Feedback</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FeaturedActivityCarousel;
