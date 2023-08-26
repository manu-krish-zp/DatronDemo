"use client"
import React from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Hidden,
    Link,
    Step,
    StepLabel,
    Stepper,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import type { Metadata } from "next";
  import Image from "next/image";
  import "../globals.css";
  import { redirect, useRouter } from "next/navigation";
  import bg from "../../public/images/header_pattern.svg";
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
  import { useContext } from "react";
  import { StatusContext } from "@/app/Hooks/StatusProvider";
  import { FileContext } from "@/app/Hooks/FileProvider";
  import SplitButton from "@/app/components/SplitButton";
import { themeColors } from '../theme/theme';
  
  
  const steps = ["Upload", "Generate", "Approve", "Download"];
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

const NavBar = () => {
    const { status, setStatuses } = useContext(StatusContext);
    const { data, setData, selectedRows, setSelectedRows } =
      useContext(FileContext);
    const { push,replace } = useRouter();
    const theme: Theme = useTheme();
  
    const smUP: boolean = useMediaQuery(() => theme.breakpoints.up("md"));
    const small: boolean = useMediaQuery(() => theme.breakpoints.down("md"));
  
    const validate = async () => {
      setStatuses((previous) => ({ ...previous, validating: true }));
      const res = await fetch("/api/validateData", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });
  
      if (res.status === 200) {
        const val = await res.json();
        const modifiedFile = JSON.parse(val.body);
        setData(modifiedFile);
        setSelectedRows(Array<boolean>(modifiedFile.data.length).fill(true));
        setStatuses({
          step: 2,
          isComplete: true,
          validating: false,
          isValidated: false,
        });
      } else {
        push("demo/error");
      }
    };
    const continueDownload = async () => {
      setStatuses((prev) => ({ ...prev, validating: true }));
      const dataCopy = data!.data.slice();
      const headers = dataCopy.shift();
  
      const rows = dataCopy.filter((row, index) => selectedRows[index] === true);
      rows.unshift(headers);
      await timeout(100);
  
      setData({ ...data!, data: rows });
      /*Generate user validated file*/
      setStatuses((prev) => ({
        ...prev,
        isValidated: true,
        step: 3,
        validating: false,
      }));
    };
  
    const getButton = () => {
      switch (status.step) {
        case 0:
        case 1:
          return (
            <Button
              variant="contained"
              onClick={validate}
              disabled={!data}
              endIcon={<ArrowForwardIcon />}
              // sx={{position:{xs:"absolute",sm:'static'},bottom:20,right:10}}
            >
              Generate
            </Button>
          );
        case 2:
          return (
            <Button
              variant="contained"
              disabled={!data}
              endIcon={<ArrowForwardIcon />}
              onClick={continueDownload}
              // sx={{position:{xs:"absolute",sm:'static'},bottom:20,right:10}}
            >
              Continue
            </Button>
          );
        case 3:
          return <SplitButton />;
      }
    };
  return (
    <Box
    height={{ md: 150, xs: 100 }}
    bgcolor={themeColors.gray2}
    sx={{
      backgroundImage: `url(${bg.src})`,
      backgroundRepeat: "no-repeat",
    }}
  >
    <Box my={0} p={4} alignItems={"center"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={'center'} sx={{cursor:'pointer'}}>
        <Hidden mdUp implementation="css" >
          <Image
            alt="Datron"
            src={"/images/logo_small.png"}
            height={40}
            width={40}
            onClick={() => {
              setStatuses({
                validating: false,
                isComplete: false,
                isValidated: false,
                step: 0,
              });
              setData(null);
              replace("/demo");
            }}
          />
        </Hidden>
        <Hidden mdDown implementation="css">
          <Image
            alt="Datron"
            src={"/images/logo_home.png"}
            height={45}
            width={150}
            onClick={() => {
              setStatuses({
                validating: false,
                isComplete: false,
                isValidated: false,
                step: 0,
              });
              setData(null);
              replace('/demo');
            }}
          />
        </Hidden>
        </Box>

       <Hidden mdDown implementation="css">
            <Stepper
              activeStep={status.step}
              alternativeLabel
              sx={{
                maxWidth: "50%",
                minWidth: { lg: "700px", xs: "300px" },
                mx: "auto",
                pt: 2,
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography variant="body1">{label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            </Hidden>
      
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"end"}
        >
          <Box width="fit-content">{getButton()}</Box>
        </Box>
      </Box>
    </Box>
  </Box>
  )
}

export default NavBar