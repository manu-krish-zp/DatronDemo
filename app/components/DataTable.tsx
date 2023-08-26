import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import { themeColors } from "../theme/theme";

const DataTable = ({ data }: { data: Array<any> }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
    mx={'auto'}
      sx={{
        width: "98vw",

      }}
    >
      <Box boxShadow={2}>
        <TableContainer sx={{maxHeight:window.innerHeight-300}}>
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
                {data[0].map((header: string | number, index: number) => (
                  <TableCell
                    align={"left"}
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
                  return (
                    <TableRow key={`Row${index}`} hover>
                      {row.map((column: string | number, index2: number) => {
                        return (
                          <TableCell
                            key={`Item${index}${index2}`}
                            align="left"
                          >
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

export default DataTable;
