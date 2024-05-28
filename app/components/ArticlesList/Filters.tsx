"use client";

import { Chip } from "@mui/material";
import { useState } from "react";

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
  return (
    <div className="flex flex-col items-center gap-3 py-20">
      <p>Explore:</p>
      <div className="flex flex-row gap-2">
        {FiltersList.map((filter) => (
          <Chip
            onClick={() => setActiveFilter(filter)}
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
