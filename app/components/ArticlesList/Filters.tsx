"use client";

import { Chip, CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";
import getAllCategories from "@/app/data/getAllCategories";
import { Category } from "@/app/types/category/types";

const Filters = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Show All");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  (async () => {
    try {
      const categories = await getAllCategories();
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  })();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleTagClick = (tag: string) => {
    setActiveCategory(tag);
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-20 pb-8">
      <p>Explore:</p>
      <div className="flex flex-row gap-2">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {categories.map((category) => (
              <Chip
                href={
                  pathname +
                  "?" +
                  createQueryString("categories", String(category.id) || "")
                }
                component={Link}
                scroll={false}
                onClick={() => handleTagClick(category.name)}
                key={category.id}
                color="primary"
                variant={
                  activeCategory === category.name ? "filled" : "outlined"
                }
                label={category.name}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Filters;
