import { Post } from "../types/post/types";

const getStickyPosts = async (
  type: "general-learning" | "brain-games"
): Promise<Post[]> => {
  const postType = type === "general-learning" ? "posts" : "brain-games";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/${postType}?sticky=true&_embed=true`
    );

    return await response.json();
  } catch {
    throw new Error("Error fetching sticky posts");
  }
};

export default getStickyPosts;
