import { GameCategory } from "../types/category/types";

// maybe make this a route handler?
const getAllGameCategories = async (): Promise<GameCategory[]> => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/game-categories`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await categories.json();
};

export default getAllGameCategories;
