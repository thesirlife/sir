import { PaginationItem } from "@mui/material";
import Link from "next/link";
type PaginationProps = {
  page: number;
  total: string;
};

const Pagination = ({ page, total }: PaginationProps) => {
  return (
    <>
      <PaginationItem
        disabled={page <= 1}
        type="previous"
        component={Link}
        scroll={false}
        href={`/general-learning?page=${page > 1 ? page - 1 : 1}`}
      />
      {Array.from({ length: Math.ceil(parseInt(total) / 5) }).map(
        (_, index) => (
          <PaginationItem
            key={index}
            scroll={false}
            page={index + 1}
            component={Link}
            href={`/general-learning?page=${index + 1}`}
          />
        )
      )}
      <PaginationItem
        type="next"
        scroll={false}
        disabled={page >= Math.ceil(parseInt(total) / 5)}
        component={Link}
        href={`/general-learning?page=${
          page < Math.ceil(parseInt(total)) ? Number(page) + 1 : null
        }`}
      />
    </>
  );
};

export default Pagination;
