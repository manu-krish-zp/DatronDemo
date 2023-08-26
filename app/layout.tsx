"use client";
import { Box } from "@mui/material";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import StatusProvider from "./Hooks/StatusProvider";
import FileProvider from "./Hooks/FileProvider";

const theme = createTheme({
  typography: {
    fontFamily: [
      "sans-serif",
      "Inter",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightRegular: 700,
  },
  palette: {
    mode: "light",

    primary: {
      main: "#FF344B",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#000000",
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <StatusProvider>
            <FileProvider>{children}</FileProvider>
          </StatusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
