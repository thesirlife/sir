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
import Trivia from "../TriviaForms/Form";
import { Post } from "@/app/types/post/types";
import CtaBox from "../CtaBox/CtaBox";
import brainGames from "@/app/cta-images/brain-games.jpg";
import { shuffleArray } from "@/app/util/shuffleArray";
import { Choice, TriviaPost } from "@/app/types/trivia/types";

type FeaturedActivityCarouselProps = {
  article: Post;
  video: Post;
  trivia: TriviaPost;
};

const FeaturedActivityCarousel = ({
  article,
  video,
  trivia,
}: FeaturedActivityCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();
  const [choices, setChoices] = useState<Choice[]>();

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

  useEffect(() => {
    const choices: Choice[] = [
      { text: trivia?.incorrect_answer_1, isAnswer: false },
      { text: trivia?.incorrect_answer_2, isAnswer: false },
      { text: trivia?.correct_answer, isAnswer: true },
    ];
    const newChoices: Choice[] = shuffleArray(choices);
    setChoices(newChoices);
  }, [trivia]);

  return (
    <div className="relative">
      <DailyChecklist
        currentSlide={currentSlide}
        setCurrentSlide={handleFocus}
        className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
      />
      <div className="bg-pattern-green overflow-hidden flex items-center justify-center py-16">
        <div className="flex flex-row gap-5 px-4 items-center">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{
              watchDrag: false,
            }}
          >
            <CarouselContent className="container ">
              {trivia && choices && (
                <CarouselItem className="flex justify-center">
                  <div className="max-w-[956px] flex flex-col md:flex-row items-center justify-around md:justify-between gap-20 h-full w-full">
                    <h2 className=" mb-4 text-4xl font-bold md:basis-1/2">
                      Test Your Knowledge With Some Quick Trivia!
                    </h2>
                    <div className="flex flex-col basis-1/2">
                      <Trivia
                        title={trivia?.title.rendered}
                        choices={choices}
                        trivia_meta_snippet={trivia?.trivia_meta_snippet}
                      />
                    </div>
                  </div>
                </CarouselItem>
              )}
              {article && (
                <CarouselItem className="flex justify-center">
                  <div className="max-w-[956px] flex flex-col md:flex-row items-center justify-around md:justify-between gap-20 h-full w-full">
                    <h2 className="text-4xl font-bold md:basis-1/2">
                      {article.title.rendered}
                    </h2>
                    <div className="flex flex-col basis-1/2">
                      <CtaBox
                        header={article.title.rendered}
                        image={
                          article._embedded?.["wp:featuredmedia"][0]
                            .source_url || brainGames
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
              )}
              {video && (
                <CarouselItem className="flex justify-center">
                  <div className="max-w-[956px] flex flex-col md:flex-row items-center justify-around md:justify-between gap-10 md:gap-20 h-full w-full">
                    <h2
											className="text-4xl font-bold md:basis-1/2"
											dangerouslySetInnerHTML={{ __html: video.title.rendered }}
										/>
                    <div className="flex flex-col basis-1/2">
                      <CtaBox
                        header={video.title.rendered}
                        image={
                          article._embedded?.["wp:featuredmedia"][0]
                            .source_url || brainGames
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
              )}
            </CarouselContent>
            <CarouselPrevious className="max-md:hidden" onClick={scrollPrev} />
            <CarouselNext className="max-md:hidden" onClick={scrollNext} />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FeaturedActivityCarousel;
