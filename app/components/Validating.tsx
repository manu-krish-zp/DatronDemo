import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'

const Validating = () => {
  return (
    <Box
      sx={{ borderRadius: 4 }}
      px={{ xs: 2, md: 8 }}
      pt={{ xs: 2, md: 4 }}
      pb={{ xs: 2, md: 8 }}
      boxShadow={2}
      mx={"auto"}
      width={{ xs: 200, md: 600 }}
    >
        <Typography
        textAlign='center'
          color={"text.primary"}
          pb={{ xs: 2, md: 4 }}
          variant="h6"
        >
         Please wait while the data is being processed..
        </Typography>
        <LinearProgress color="primary" />
    </Box>
  )
}

export default Validating