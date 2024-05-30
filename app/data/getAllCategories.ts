import { Category } from "../types/category/types";

const getAllCategories = async (): Promise<Category[]> => {
  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/categories`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await articles.json();
};

export default getAllCategories;
