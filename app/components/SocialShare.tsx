import { X, Facebook, Email } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const SocialShare = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="drop-shadow-sm font-medium">Share this article:</p>
      <div className="flex flex-row gap-2">
        <a href="https://www.facebook.com">
          <Avatar className="bg-blueGrey-primary">
            <Facebook />
          </Avatar>
        </a>
        <a href="https://www.twitter.com">
          <Avatar className="bg-blueGrey-primary">
            <X />
          </Avatar>
        </a>
        <a href="#email">
          <Avatar className="bg-blueGrey-primary">
            <Email />
          </Avatar>
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
