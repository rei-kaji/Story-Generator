import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

const Loader = () => {
  return (
    <Stack justifyContent="center" alignItems="center" width="100%">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Stack>
  );
};

export default Loader;
