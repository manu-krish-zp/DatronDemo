"use client";
import FileDetails from "@/app/components/InputFileDetails";
import UploadFiles from "@/app/components/UploadFiles";
import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import OutPutFileDetails from "../components/OutPutFileDetails";
import InputFileDetails from "@/app/components/InputFileDetails";
import LoadingComponent from "../components/Loading";
import { StatusContext } from "@/app/Hooks/StatusProvider";
import { FileContext, FileType } from "@/app/Hooks/FileProvider";


const Page = () => {
  const { status, setStatuses } = useContext(StatusContext);
  const { data, setData } = useContext(FileContext);

  const getName = (s: string) => {
    if (s.length > 23) {
      return (
        s.charAt(0).toUpperCase() +
        s.substring(1, 20) +
        "..." +
        s.substring(s.length - 3)
      );
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const cancel = () => {
    setData(null);
  };
  return (
    <Box>
      {!data && <UploadFiles setData={setData} setStatuses={setStatuses}></UploadFiles>}
      {data &&
        (!status.isComplete ? (
          <InputFileDetails setData={setData} data={data!}></InputFileDetails>
        ) : (
          <OutPutFileDetails data={data!}></OutPutFileDetails>
        ))}
         {status.validating && <LoadingComponent></LoadingComponent>}
    </Box>
    
  );
};

export default Page;
