"use client";

import { X, Facebook, Email } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { FacebookShareButton } from "react-share";
type SocialShareProps = {
  url: string;
  title: string;
};

const SocialShare = ({ url, title }: SocialShareProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="drop-shadow-sm font-medium">Share this article:</p>
      <div className="flex flex-row gap-2">
        <Avatar className="bg-blueGrey-primary">
          <FacebookShareButton url={url}>
            <Facebook />
          </FacebookShareButton>
        </Avatar>
        <a
          href={`http://twitter.com/share?text=${title}&url=${url}`}
          target="_blank"
        >
          <Avatar className="bg-blueGrey-primary">
            <X />
          </Avatar>
        </a>
        <a href={`mailto:?subject=${title}&body=${url}`}>
          <Avatar className="bg-blueGrey-primary">
            <Email />
          </Avatar>
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
