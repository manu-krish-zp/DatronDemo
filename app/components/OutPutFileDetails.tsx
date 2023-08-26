import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React, { useContext } from "react";
import DataTable from "./DataTable";
import { FileType } from "../Hooks/FileProvider";
import DataValidationTable from "./DataValidationTable";
import { StatusContext } from "../Hooks/StatusProvider";

const OutPutFileDetails = ({ data }: { data: FileType }) => {
  const {status}=useContext(StatusContext)
  return (
    <Box mx={"auto"} width="fit-content">
      {status.isValidated?<DataTable data={data.data} />:<DataValidationTable data={data.data} />}
      
      <Box display={"flex"} justifyContent={"center"}>
        <Typography></Typography>
      </Box>
    </Box>
  );
};

export default OutPutFileDetails;
