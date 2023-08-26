import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { FileContext } from "../Hooks/FileProvider";
import { themeColors } from "../theme/theme";

const DataValidationTable = ({ data }: { data: Array<any> }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { selectedRows, setSelectedRows } = useContext(FileContext);

  const handleCheckBoxChange = (index: number) => {
    let copy = selectedRows.slice();
    copy[index] = !copy[index];
    setSelectedRows(copy);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSelectAll = () => {
    setSelectedRows(Array<boolean>(data?.length).fill(true));
  };
  const getTotalSelectedCount=()=>{
    return selectedRows.filter(element=>element===true).length
  }
  return (
    <Box
      mx={"auto"}
      sx={{
        width: "98vw",
      }}
    >
      <Box boxShadow={2}>
        <TableContainer sx={{ maxHeight: window.innerHeight - 300 }}>
          <Table stickyHeader aria-label="Header">
            <TableHead
              sx={{
                "& th": {
                  backgroundColor: themeColors.gray3,
                  fontWeight: 700,
                },
              }}
            >
              <TableRow>
                <TableCell padding="checkbox" align="center">
                  <Checkbox
                    color="primary"
                    checked={getTotalSelectedCount()===data.length}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedRows(Array<boolean>(data?.length).fill(true))
                      } else {
                        setSelectedRows(Array<boolean>(data?.length).fill(false))
                      }
                    }}
                  />
                </TableCell>
                {data[0].map((header: string | number, index: number) => (
                  <TableCell
                    align={"center"}
                    key={`header-${header}`}
                    //   style={{ minWidth: column.minWidth }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(1)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isSelected = selectedRows[index + page * rowsPerPage];
                  return (
                    <TableRow key={`Row${index}`} hover>
                      <TableCell
                        padding="checkbox"
                        align="center"
                        sx={{ margin: 0 }}
                      >
                        <Checkbox
                          color="primary"
                          onChange={() => {
                            handleCheckBoxChange(index + page * rowsPerPage);
                          }}
                          checked={isSelected}
                        />
                      </TableCell>
                      {row.map((column: string | number, index2: number) => {
                        return (
                          <TableCell key={`Item${index}${index2}`} align="center">
                            {column}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={data.length - 1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataValidationTable;
