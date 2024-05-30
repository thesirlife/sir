"use client";

import { Chip } from "@mui/material";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const FiltersList: string[] = [
  "Show All",
  "History",
  "Science",
  "Food",
  "Culture",
  "Guides",
];

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState<string>("Show All");
  const [tag, setTag] = useState<string>();
  const router = useRouter();
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
    setActiveFilter(tag);
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-20 pb-8">
      <p>Explore:</p>
      <div className="flex flex-row gap-2">
        {FiltersList.map((filter) => (
          <Chip
            href={pathname + "?" + createQueryString("tags", filter || "")}
            component={Link}
            scroll={false}
            onClick={() => handleTagClick(filter)}
            key={filter}
            color="primary"
            variant={activeFilter === filter ? "filled" : "outlined"}
            label={filter}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
