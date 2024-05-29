import { Post } from "../types/post/types";

let total: string = "";
const getPosts = async (): Promise<Post[]> => {
  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?_embed`,
    {
      headers: {
        "Content-Type": "application/json",
        // remove once live and we're not behind wpengine login
        Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
      },
    }
  );
  // WP exposes the total number of articles in the headers, so we can use that to calculate pagination/get total number of articles
  // total = String(articles.headers.get("X-WP-Total"));
  return await articles.json();
};

export default getPosts;
