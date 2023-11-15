// PostTable.tsx
import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import TablePagination from "./pagination";
import TextField from "@mui/material/TextField";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostTableProps {
  data: Post[];
}

const PostTable: React.FC<PostTableProps> = ({ data }) => {
  const [filter, setFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ value }: { value: string }) => (
          <div className="truncate-text">{value}</div>
        ),
      },
      {
        Header: "Body",
        accessor: "body",
        Cell: ({ value }: { value: string }) => (
          <div className="truncate-text">{value}</div>
        ),
      },
    ],
    []
  );
  const filteredData = React.useMemo(() => {
    if (!filter) return data;
    return data.filter((post) =>
      Object.values(post).some((value) =>
        String(value).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    state,
    pageCount,
    gotoPage,
    pageSize,
    setPageSize,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div>
      <div className="input">
        <TextField
          label="Search"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setGlobalFilter(e.target.value || undefined);
          }}
        />
      </div>

      <table {...getTableProps()} className="table-wrapper">
        <thead className="table-head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-4 border-black border border-solid"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="table-body">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-text">
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    className={`  ${index === 2 ? "truncate-cell" : ""}`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Reusable TablePagination component */}
      <div className="wrapper-pagination">
        <TablePagination
          pageCount={pageCount}
          pageIndex={state.pageIndex}
          gotoPage={gotoPage}
        />

        {/* Page size dropdown */}
        <div>
          <span>Page Size: </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostTable;
