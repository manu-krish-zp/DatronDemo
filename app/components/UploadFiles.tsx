"use client";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import bg from "../../public/images/inner5_back.png"
import { FileType } from "../Hooks/FileProvider";
import { statusType } from "../Hooks/StatusProvider";
import { themeColors } from "../theme/theme";
const UploadFiles = ({
  setData,
  setStatuses
}: {
  setData: React.Dispatch<FileType | null>;
  setStatuses:React.Dispatch<React.SetStateAction<statusType>>
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const readFile = (files: FileList) => {
    setStatuses((prev =>({...prev,validating:true})))
    var reader = new FileReader();

    reader.onload = function (e: ProgressEvent<FileReader>) {
      var XLSX = require("xlsx");
      var data = e.target?.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1,defval: "" });
      setData({
        fileName: files[0].name,
        data: dataParse,
        size: files[0].size,
      });
      setStatuses((prev =>({...prev,validating:false})))
    };
    reader.readAsBinaryString(files[0]);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    readFile(files);
  };

  return (
    <Box
    mt={2}
      sx={{ borderRadius: 4 }}
      px={{ xs: 2, md: 8 }}
      pt={{ xs: 2, md: 4 }}
      pb={{ xs: 2, md: 8 }}
      boxShadow={2}
      mx={"auto"}
      width={{ xs: 300, md: 600 }}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      bgcolor={'white'}
      
    >
      <Paper elevation={0} onDragOver={handleDragOver} onDrop={handleDrop}>
        <Typography
          color={"text.primary"}
          variant="h4"
          sx={{fontSize:{xs:20,md:'30px'}}}
        >
          Upload your file
        </Typography>
        <Typography variant={"caption"} color={'text.secondary'} pb={{ xs: 2, md: 4 }}>
              Supported formats : xlsx,xls,csv
            </Typography>
        <label>
          <input
            type="file"
            hidden
            accept=".xls,.xlsx,.csv"
            onChange={(event) => {
              if (event.target.files) {
                readFile(event.target.files);
              }
            }}
          />
          <Box
            bgcolor={themeColors.gray2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            height={{ xs: 200, md: 280 }}
            justifyContent={"center"}
            sx={{ border: "dashed", borderWidth: 1,cursor:"pointer",backgroundImage:`url(${bg.src})` }}
          >
            <CloudUploadIcon sx={{color:'text.secondary'}} fontSize="large"/>
            <Typography variant={"h5"} color={'text.secondary'} align="center" sx={{fontSize:{xs:20,md:'30px'}}}>
              Choose a file or drag it here
            </Typography>
          </Box>
        </label>
      </Paper>
    </Box>
  );
};

export default UploadFiles;
