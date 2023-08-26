import React from "react";
import "./Loading.css";
import { Box } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import logo from "../../public/images/logo_home.png";
const LoadingComponent = () => {
  return (
    <Box id="preloader">

      <Box id="loading-wrapper" className="show">
        <Box id="loading-text">
          <Image
            priority
            src={logo}
            height={32}
            width={100}
            alt=""
          />
        </Box>
        <Box id="loading-content"></Box>
      </Box>
    </Box>
  );
};

export default LoadingComponent;