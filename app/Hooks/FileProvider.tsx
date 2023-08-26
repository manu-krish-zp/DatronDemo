"use client";
import { createContext, useEffect, useState } from "react";

export type FileType = {
    fileName: string;
    data: Array<any>;
    size: number;
  };


type contextType={
    data: FileType | null,
    setData: React.Dispatch<React.SetStateAction<FileType | null>>,
    selectedRows: boolean[],
    setSelectedRows: React.Dispatch<React.SetStateAction<boolean[]>>
}

export const FileContext=createContext<contextType>({} as contextType)

import React from 'react'

const FileProvider =({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const getContext=()=>{
  
      const [data, setData] = useState<FileType | null>(null);
      const [selectedRows, setSelectedRows] = useState<boolean[]>(
       []
      );
      return {data,setData,selectedRows,setSelectedRows}
  }
  return (
   <FileContext.Provider value={getContext()}>{children}</FileContext.Provider>
  )
}

export default FileProvider