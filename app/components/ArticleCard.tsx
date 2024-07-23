"use client";

import Image, { StaticImageData } from "next/image";
import IconWithBackground from "./IconWithBackground";
import {
  PodcastsOutlined,
  NavigateNext,
  ArticleOutlined,
  GamesOutlined,
  PlayCircleOutline,
} from "@mui/icons-material";
import { Paper, PaperProps } from "@mui/material";
import { MouseEvent, PropsWithChildren, useEffect, useState } from "react";
import Button from "./global/Button";
import getTagById from "../data/getTagById";
import getMediaById from "../data/getMediaById";
import { Media } from "../types/media/types";
import { sendGAEvent } from "@next/third-parties/google";

import BrainHq from "@/app/cta-images/brain-hq-default.jpg";
import createBrainHQUser from "@/app/data/createBrainHQUser";

type ArticleCardProps = PaperProps & {
  session: {
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
  header: string;
  image?: string | StaticImageData;
  imageWidth?: number;
  imageHeight?: number;
  description: string;
  url?: string;
  gameUrl?: string;
  imageOnTop?: boolean;
  tagId?: number | null;
  isGame?: boolean;
  imageId: number;
};

type ArticleProperties = {
  header: string;
  icon: JSX.Element;
};

const ArticleTypeDictionary: Record<string, ArticleProperties> = {
  trivia: {
    header: "Play Trivia",
    icon: <PodcastsOutlined />,
  },
  article: {
    header: "Read Article",
    icon: <ArticleOutlined />,
  },
  video: {
    header: "Watch Video",
    icon: <PlayCircleOutline />,
  },
  game: {
    header: "Play Game",
    icon: <GamesOutlined />,
  },
};

// I want to maybe consolidate this component with CtaBox, but they're almost different enough to warrant keeping separate
// I think there'd be a lot of conditional CSS if I tried to combine them, which could be confusing

const ArticleCard = ({
  session,
  header,
  url,
  image,
  isGame,
  description,
  imageId,
  imageWidth,
  imageOnTop,
  imageHeight,
  gameUrl,
  tagId,
  children,
  ...props
}: PropsWithChildren<ArticleCardProps>) => {
  const [error, setError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<Media>();
  const [tag, setTag] = useState<string>("article");
  const [articleUrl, setArticleUrl] = useState<string>("");
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  const handleGame = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = await createBrainHQUser(
      session?.user.id,
      session?.user.email,
      session?.user.name
    );
    // when you get the type of the response from the API, you can replace Object with that type
    // then, the errors below should resolve since they now exist on the type, instead of just the generic Object type
    if (!result.error) {
      setError("");
      const { web } = result;
      window.open(web, "_blank")?.focus();
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    (async () => {
      setImageUrl(await getMediaById(imageId));
    })();

    (async () => {
      if (!tagId || (await getTagById(tagId)) === undefined) {
        setTag(ArticleTypeDictionary.trivia.header);
      } else {
        setTag((await getTagById(tagId)).slug);
        setIcon(ArticleTypeDictionary[tag].icon);
      }
    })();

    if (isGame) {
      setTag("game");
    } else {
      setArticleUrl(`/general-learning/${url}`);
    }
  }, [icon, imageId, isGame, tag, tagId, url]);

  return (
    <Paper
      elevation={2}
      square
      {...props}
      className={`flex ${
        imageOnTop ? "flex-col" : "flex-row"
      } gap-5 min-h-[192px] p-8`}
    >
      {imageUrl !== undefined && (
        <div className="basis-1/2 relative">
          <Image
            src={imageUrl.source_url || (isGame ? BrainHq : "")}
            alt={header}
            width={imageWidth ? imageWidth : 212}
            height={imageHeight ? imageHeight : 144}
            className="w-full rounded"
          />

          {tagId && (
            <IconWithBackground icon={icon} className="absolute top-2 left-2" />
          )}
        </div>
      )}

      <div className="basis-1/2 flex flex-col justify-between items-start">
        <div>
          <h3
            className="text-xl font-bold"
            dangerouslySetInnerHTML={{ __html: header }}
          />
          <div
            className="text-navy-secondary mt-3"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
        <Button
          color="warning"
          variant="text"
          className="flex flex-row gap-2 mt-3"
          href={isGame ? gameUrl : articleUrl}
          target={isGame ? "_blank" : "_self"}
          endIcon={<NavigateNext fontSize="medium" />}
          onClick={(e) => {
            sendGAEvent({
              event: isGame ? "gameClicked" : "articleClicked",
              value: isGame ? gameUrl : articleUrl,
            });

            if (isGame) {
							// @ts-ignore
							pendo.track("Play Game", {
								game: header,
							});
              handleGame(e);
            }
          }}
        >
          {ArticleTypeDictionary[tag]
            ? ArticleTypeDictionary[tag].header
            : "Read Article"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </Paper>
  );
};

export default ArticleCard;
