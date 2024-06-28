import { Category } from "../types/category/types";

const getCategoryById = async (id: number): Promise<Category> => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_WPREST_ENDPOINT + "/categories/" + id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.json();
};

export default getCategoryById;
