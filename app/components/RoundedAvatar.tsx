import { Avatar, Typography } from "@mui/material";
import React from "react";

const RoundedAvatar = ({ userName }: { userName: string }) => {
  return (
    <Avatar
    data-testid="avatar"
      variant="rounded"
      sx={{ height: "36px", width: "36px", bgcolor: "primary.main" }}
    >
      {userName}
    </Avatar>
  );
};

export default RoundedAvatar;
