"use client";

import { Chip } from "@mui/material";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Category, GameCategory } from "@/app/types/category/types";

type FilterProps = {
  categories: number;
  categoryList: Category[] | GameCategory[];
};

const Filters = ({ categories, categoryList }: FilterProps) => {
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
        <>
          <Chip
            href={pathname}
            component={Link}
            clickable
            scroll={false}
            color="secondary"
            variant={!categories ? "filled" : "outlined"}
            label={"Show All"}
          />
          {categoryList.map((category) => (
            <Chip
              href={pathname + "?" + createQueryString(0, category.id)}
              component={Link}
              scroll={false}
              clickable
              key={category.id}
              color="secondary"
              variant={categories == category.id ? "filled" : "outlined"}
              label={category.name}
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default Filters;
