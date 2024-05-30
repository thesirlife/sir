"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { PaginationItem } from "@mui/material";
import Link from "next/link";
import { useCallback } from "react";
type PaginationProps = {
  offset: number;
  categories: number;
  total: string;
};

const Pagination = ({ offset, total, categories }: PaginationProps) => {
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
          createQueryString(offset < 0 ? offset - 5 : 0, categories)
        }
      />
      {Array.from({ length: Math.ceil(parseInt(total) / 5) }).map(
        (_, index) => (
          <PaginationItem
            key={index}
            scroll={false}
            selected={offset / 5 === index}
            page={index + 1}
            component={Link}
            href={pathname + "?" + createQueryString(index * 5, categories)}
          />
        )
      )}
      <PaginationItem
        type="next"
        scroll={false}
        disabled={parseInt(total) - offset <= 5}
        component={Link}
        href={
          pathname + "?" + createQueryString(Number(offset) + 5, categories)
        }
      />
    </>
  );
};

export default Pagination;
