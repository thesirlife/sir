"use client";

import {
  Pagination as MuiPagination,
  type PaginationProps as MuiPaginationProps,
} from "@mui/material";

type PaginationProps = MuiPaginationProps & {
  count: number;
  page: number;
};

const Pagination = ({ count, page, ...props }: PaginationProps) => {
  return <MuiPagination count={count} {...props} />;
};

export default Pagination;
