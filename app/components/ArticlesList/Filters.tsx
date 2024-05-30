"use client";

import { Chip } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [tags, setTags] = useState<number[]>([]);

  const router = useRouter();

  const handleTagClick = (tag: string) => {
    // setTags([tag]);
    router.push(`${window.location}?tags=${tags}`, {
      scroll: false,
    });
    setActiveFilter(tag);
  };
  return (
    <div className="flex flex-col items-center gap-3 pt-20 pb-8">
      <p>Explore:</p>
      <div className="flex flex-row gap-2">
        {FiltersList.map((filter) => (
          <Chip
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
