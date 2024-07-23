"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationItem } from "@mui/material";
import Link from "next/link";
import { useCallback } from "react";
type PaginationProps = {
  offset: number;
  categories: number;
  total: string;
  pageSize?: number;
};

const Pagination = ({
  offset,
  total,
  categories,
  pageSize = 5,
}: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (offset: number, categories: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("offset", String(offset));
      const category = params.get("categories");
      category ? params.set("categories", String(categories)) : null;
      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <PaginationItem
        disabled={offset == 0}
        type="previous"
        component={Link}
        scroll={false}
        href={
          pathname +
          "?" +
          createQueryString(offset < 0 ? offset - pageSize : 0, categories)
        }
      />
      {Array.from({ length: Math.ceil(parseInt(total) / pageSize) }).map(
        (_, index) => (
          <PaginationItem
            key={index}
            scroll={false}
            selected={offset / pageSize === index}
            page={index + 1}
            component={Link}
            href={
              pathname + "?" + createQueryString(index * pageSize, categories)
            }
          />
        )
      )}
      <PaginationItem
        type="next"
        scroll={false}
        disabled={parseInt(total) - offset <= pageSize}
        component={Link}
        href={
          pathname +
          "?" +
          createQueryString(Number(offset) + pageSize, categories)
        }
      />
    </>
  );
};

export default Pagination;
