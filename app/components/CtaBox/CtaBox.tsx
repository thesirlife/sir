import Image from "next/image";
import { MouseEvent, PropsWithChildren } from "react";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Paper, { PaperProps } from "@mui/material/Paper";
import { PodcastsOutlined, OpenInNew } from "@mui/icons-material";
import Button from "../global/Button";

import createBrainHQUser from "@/app/data/createBrainHQUser";

import IconWithBackground from "../IconWithBackground";
import LinkWithIcon from "../LinkWithIcon";

type CtaBoxProps = PaperProps & {
  image: ImageProps["src"];
  imageWidth?: number;
  imageHeight?: number;
  header?: string;
  icon?: JSX.Element;
  link?: {
    href: string;
    label?: string;
    isExternal?: boolean;
  };
  narrow?: boolean;
  altBodyText?: boolean;
  imageOnTop?: boolean;
  isGame?: boolean;
	session?: {
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
};

const CtaBox = ({
  image,
  header,
  icon,
  link,
  imageHeight = 160,
  imageWidth = 400,
  imageOnTop = true,
  narrow,
  children,
  altBodyText = false,
	isGame = false,
	session,
  ...props
}: PropsWithChildren<CtaBoxProps>) => {
	const handleGame = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

		if (session) {
			const result = await createBrainHQUser(
				session?.user.id,
				session?.user.email,
				session?.user.name
			);
			// when you get the type of the response from the API, you can replace Object with that type
			// then, the errors below should resolve since they now exist on the type, instead of just the generic Object type
			if (!result.error) {
				const { web } = result;
				window.open(web, "_blank")?.focus();
			} else {
				console.error(result.error);
			}
		}
  };

  const Icon = icon;
  return (
    <Paper
      elevation={2}
      square
      {...props}
      className="max-md:justify-center flex"
    >
      <div
        className={`flex flex-col gap-4  ${
          narrow ? "p-4" : "p-6"
        } max-w-[442px]`}
      >
        <div
          className={`basis-1/2 relative ${
            imageOnTop ? "order-first" : "order-last"
          }`}
        >
          <Image
            src={image}
            alt={header || ""}
            width={imageWidth}
            height={imageHeight}
            className="w-full max-h-[160px] object-cover"
          />
          {Icon && (
            <IconWithBackground
              icon={<PodcastsOutlined />}
              className="absolute top-2 left-2"
            />
          )}
        </div>
        <div className="flex flex-col basis-1/2 max-md:text-center overflow-x-hidden">
          <h3
            className="text-xl font-bold mb-2"
            dangerouslySetInnerHTML={{ __html: header || ("" as string) }}
          />
          <div
            className={`${
              altBodyText
                ? "text-navy-primary text-lg"
                : "text-navy-secondary overflow-hidden "
            }`}
            dangerouslySetInnerHTML={{
              __html: children as string,
            }}
          ></div>
          {link && !isGame ? (
            <div className="text-orange-primary text-sm uppercase mt-8">
              <LinkWithIcon
                href={String(link?.href)}
                label={String(link?.label)}
                isExternal={link?.isExternal}
              />
            </div>
          ) : null}
					{link && isGame ? (
						<div className="text-orange-primary text-sm uppercase mt-8">
							<Button
								color="warning"
								variant="text"
								className="flex items-center gap-1 leading-5"
								onClick={(e) => {
									// @ts-ignore
									pendo.track("Play Game", {
										game: header,
										visitorId: session?.user.id,
									});

									handleGame(e);
								}}
							>
								<span>{link?.label}</span>
								<OpenInNew fontSize="small" />
							</Button>
						</div>
					) : null}
        </div>
      </div>
    </Paper>
  );
};

export default CtaBox;
