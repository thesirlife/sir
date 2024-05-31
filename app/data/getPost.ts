import { Post } from "../types/post/types";

export const getPost = async (id: string): Promise<Post> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        // remove once live and we're not behind wpengine login
        Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
      },
      next: {
        // maybe we'll change, but this'll refetch content after 10 minutes, probably not necessary but a good experience if it changes in wordpress
        revalidate: 6000,
      },
    }
  );

  return await data.json();
};
