// TablePagination.tsx
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface TablePaginationProps {
  pageCount: number;
  pageIndex: number;
  gotoPage: (pageIndex: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  pageCount,
  pageIndex,
  gotoPage,
}) => {
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          page={pageIndex + 1}
          onChange={(_, value) => gotoPage(value - 1)}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default TablePagination;
