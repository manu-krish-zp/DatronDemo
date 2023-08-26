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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { themeColors } from "../theme/theme";

const DataGridTable = ({ data }: { data: Array<any> }) => {
  // const columns: GridColDef[] = [
  //     { field: 'id', headerName: 'ID', width: 90 },
  //     {
  //       field: 'firstName',
  //       headerName: 'First name',
  //       width: 150,
  //       editable: true,
  //     },
  //     {
  //       field: 'lastName',
  //       headerName: 'Last name',
  //       width: 150,
  //       editable: true,
  //     },
  //     {
  //       field: 'age',
  //       headerName: 'Age',
  //       type: 'number',
  //       width: 110,
  //       editable: true,
  //     },]

  const columns: GridColDef[] = Object.keys(data[0]).map((column) => {
    if (column === "__EMPTY") column = " ";
    return {
      field: column,
      headerName: column,
      editable: true,
      resizable:true
    };
  });
  const rows=data.map((row,index) => ({...row,id:index}))

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default DataGridTable;
