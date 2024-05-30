"use client";

import { Chip, CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";
import getAllCategories from "@/app/data/getAllCategories";
import { Category } from "@/app/types/category/types";

type FilterProps = {
  offset: number;
  categories: number;
};

const Filters = ({ offset, categories }: FilterProps) => {
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // async/client requests typically better handled by something like react query, but with everything else
  // related to this being within server components, I don't think it makes sense to use it here
  (async () => {
    try {
      const categories = await getAllCategories();
      setActiveCategories(categories);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  })();
  //

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (offset: number, categories: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("offset", String(offset));
      params.set("categories", String(categories));

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col items-center gap-3 pt-20 pb-8">
      <p>Explore:</p>
      <div className="flex flex-row gap-2">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Chip
              href={pathname}
              component={Link}
              clickable
              scroll={false}
              color="primary"
              variant={!categories ? "filled" : "outlined"}
              label={"Show All"}
            />
            {activeCategories.map((category) => (
              <Chip
                href={pathname + "?" + createQueryString(0, category.id)}
                component={Link}
                scroll={false}
                clickable
                key={category.id}
                color="primary"
                variant={categories == category.id ? "filled" : "outlined"}
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
