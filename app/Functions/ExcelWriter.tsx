import { FileType } from "../Hooks/FileProvider";

export const download = (data: FileType,type:number) => {
  var XLSX = require("xlsx");
  var worksheet = XLSX.utils.aoa_to_sheet(data.data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  if(type==0)
  {
    XLSX.writeFile(workbook, data.fileName, { type: "string" });
  }
  else
  {
    XLSX.writeFile(workbook, `${data.fileName.split(".")[0]}.csv`, {
        bookType: "csv",
      });
  }
};