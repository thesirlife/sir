import { Post } from "../types/post/types";

const getRandomVideo = async (): Promise<Post> => {
  // get General Learning articles (posts) tagged as a Video (tag id = 6)
  // then, randomly pick one
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?tags=6&status=publish&_embed=true`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const articles = await response.json();

  return articles[Math.floor(Math.random() * articles.length)];
};

export default getRandomVideo;
