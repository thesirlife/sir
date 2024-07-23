import { Post } from "../types/post/types";

const getPostsByTag = async ({ tag }: { tag: number }): Promise<Post[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?tags=${tag}&status=publish`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export default getPostsByTag;
