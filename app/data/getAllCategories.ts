import { Category } from "../types/category/types";

// maybe make this a route handler?
const getAllCategories = async (): Promise<Category[]> => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/categories`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await categories.json();
};

export default getAllCategories;
