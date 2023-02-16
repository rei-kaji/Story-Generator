import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      mt={"2rem"}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Rei Kaji
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
