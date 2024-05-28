import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem as ShadItem,
} from "@/components/ui/carousel";

type Activity = {
  type: "video" | "trivia" | "article" | "feedback";
};

type FeaturedActivityProps = {
  activity: any;

  // This will need fleshed out more obviously when I build out the activity block
};

const FeaturedActivityCarousel: FC = () => {
  return (
    <div className="bg-pattern-green h-[424px] flex items-center justify-center pt-8">
      <div className="flex flex-row gap-5 container px-4  items-center">
        <Carousel className="w-full">
          <CarouselContent>
            <ShadItem>GAVIN</ShadItem>
            <ShadItem>TEST</ShadItem>
            <ShadItem>ANOTHER</ShadItem>
            <ShadItem>BLAH</ShadItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedActivityCarousel;
