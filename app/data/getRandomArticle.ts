import { Post } from "../types/post/types";

const getRandomArticle = async (): Promise<Post> => {
  // get General Learning articles (posts) tagged as an Article (tag id = 4)
  // then, randomly pick one
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?tags=4&status=publish`,
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

export default getRandomArticle;
