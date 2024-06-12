import { PropsWithChildren } from "react";

type CarouselItemProps = {
  heading: string;
};

const CarouselItem = ({
  heading = "Get Started With a Brain Game!",
  children,
  ...props
}: PropsWithChildren<CarouselItemProps>) => {
  return (
    <div
      {...props}
      className="min-w-0 shrink-0 grow-0 basis-full flex flex-row justify-center"
    >
      <div className="max-w-[956px] flex flex-row justify-between gap-20">
        <div className="flex flex-col w-1/2">
          <h2 className=" mb-4 text-4xl font-bold">{heading}</h2>
        </div>
        <div className="flex flex-col w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default CarouselItem;
