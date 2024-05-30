import { PaginationItem } from "@mui/material";
import Link from "next/link";
type PaginationProps = {
  offset: number;
  total: string;
};

const Pagination = ({ offset, total }: PaginationProps) => {
  return (
    <>
      <PaginationItem
        disabled={offset == 0}
        type="previous"
        component={Link}
        scroll={false}
        href={`/general-learning?offset=${offset < 0 ? offset - 5 : 0}`}
      />
      {Array.from({ length: Math.ceil(parseInt(total) / 5) }).map(
        (_, index) => (
          <PaginationItem
            key={index}
            scroll={false}
            selected={offset / 5 === index}
            page={index + 1}
            component={Link}
            href={`/general-learning?offset=${index * 5}`}
          />
        )
      )}
      <PaginationItem
        type="next"
        scroll={false}
        disabled={offset >= Math.ceil(parseInt(total) / 5)}
        component={Link}
        href={`/general-learning?offset=${
          offset >= Math.ceil(parseInt(total) / 5) ? offset : Number(offset) + 5
        }`}
      />
    </>
  );
};

export default Pagination;
