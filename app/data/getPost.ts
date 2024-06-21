import { Post } from "../types/post/types";

export const getPost = async (slug: string): Promise<Post[] | undefined> => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?slug=${slug}&status=publish`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    return await data.json();
  } catch (error) {
    return;
  }
};
