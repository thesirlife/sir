import Image, { ImageProps } from "next/image";
import IconWithBackground from "./IconWithBackground";
import { PodcastsOutlined, NavigateNext } from "@mui/icons-material";
import { Paper, PaperProps, SvgIconTypeMap } from "@mui/material";
import { PropsWithChildren } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Button from "./global/Button";
import getTagById from "../data/getTagById";
import getMediaById from "../data/getMediaById";

type ArticleCardProps = PaperProps & {
  header: string;
  image?: string;
  description: string;
  tagId?: number | null;
  isGame?: boolean;
  imageId: number;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

const ArticleTypeDictionary: Record<string, string> = {
  trivia: "Play Trivia",
  article: "Read Article",
  video: "Watch Video",
  game: "Play Game",
};

// I want to maybe consolidate this component with CtaBox, but they're almost different enough to warrant keeping separate
// I think there'd be a lot of conditional CSS if I tried to combine them, which could be confusing

const ArticleCard = async ({
  icon,
  header,
  image,
  isGame,
  description,
  imageId,
  tagId,
  children,
  ...props
}: PropsWithChildren<ArticleCardProps>) => {
  const imageUrl = await getMediaById(imageId);
  const Icon = icon;

  let tag;

  if (!tagId || (await getTagById(tagId)) === undefined) {
    tag = ArticleTypeDictionary.article;
  } else {
    tag = (await getTagById(tagId)).slug;
  }

  if (isGame) {
    tag = "game";
  }

  return (
    <Paper
      elevation={2}
      square
      {...props}
      className="flex flex-row gap-4 min-h-[192px] p-8"
    >
      {imageUrl.source_url !== undefined && (
        <div className="basis-1/2 relative">
          <Image
            src={imageUrl.source_url}
            alt={header}
            width={212}
            height={144}
            className="w-full rounded"
          />

          {Icon && (
            <IconWithBackground
              icon={PodcastsOutlined}
              className="absolute top-2 left-2"
            />
          )}
        </div>
      )}

      <div className="basis-1/2 flex flex-col justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{header}</h3>
          <div
            className="text-navy-secondary "
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
        <Button
          color="warning"
          variant="text"
          className="flex flex-row gap-2 mt-"
        >
          {ArticleTypeDictionary[tag]
            ? ArticleTypeDictionary[tag]
            : "Read Article"}
          <NavigateNext fontSize="medium" />
        </Button>
      </div>
    </Paper>
  );
};

export default ArticleCard;
