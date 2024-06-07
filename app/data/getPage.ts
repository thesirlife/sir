import { Page } from "../types/page/types";

const getPage = async (id: string): Promise<Page | Record<any, any>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/pages/${id}?_embed=true`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    return await response.json();
  } catch {
    console.error("Failed to fetch page");
    return {};
  }
};

export default getPage;
