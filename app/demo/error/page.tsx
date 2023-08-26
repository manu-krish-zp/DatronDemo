import { Box, Button, LinearProgress, Typography } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  return (
    <Box
      sx={{ borderRadius: 4 }}
      px={{ xs: 2, md: 8 }}
      pt={{ xs: 2, md: 4 }}
      pb={{ xs: 2, md: 8 }}
      boxShadow={2}
      mt={4}
      mx={"auto"}
      width={{ xs: 200, md: 600 }}
    >
        <Typography
        textAlign='center'
          color={"primary"}
          pb={{ xs: 2, md: 4 }}
          variant="h4"
        >
        Error!
        </Typography>
        <Typography
        textAlign='center'
          color={"text.primary"}
          pb={{ xs: 2, md: 4 }}
          variant="h6"
        >
       Something went wrong..Please try again..
        </Typography>
    </Box>
  )
}

export default ErrorPage