"use client";

import { Chip } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const handleTagClick = (tag: string) => {
    setTag(tag);

    setActiveFilter(tag);
    router.replace(`${window.location}?tags=${tag}`, {
      scroll: false,
    });
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
