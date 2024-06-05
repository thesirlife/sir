import { Articles, Post, getPostsProps } from "../types/post/types";

let total: string = "";
const getPosts = async ({
  categories,
  offset,
}: getPostsProps): Promise<Articles<Post>> => {
  const postCategories = categories ? `categories=${categories}` : "";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?${postCategories}&offset=${offset}&per_page=5`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // WP exposes the total number of articles in the headers, so we can use that to calculate pagination/get total number of articles
  total = String(response.headers.get("X-WP-Total"));
  const articles = await response.json();
  return { total, articles };
};

export default getPosts;
