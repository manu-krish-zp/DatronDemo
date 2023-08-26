import React from "react";
import DataTable from "./DataTable";
import { Box, Button, Typography } from "@mui/material";
import { FileType } from "../Hooks/FileProvider";
import DataGridTable from "./DataGridTable";
import DataValidationTable from "./DataValidationTable";
const FileDetails = ({
  data,
  setData,
}: {
  data: FileType;
  setData: React.Dispatch<FileType | null>;
}) => {
  return (
    <Box mx={"auto"} width={'100%'} >
      <DataTable data={data.data} />
    </Box>
  );
};

export default FileDetails;
