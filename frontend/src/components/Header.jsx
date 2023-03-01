import React, { useState } from "react";
import {
  styled,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  // ThemeProvider,
} from "@mui/material";
import logo from "../assets/logo.png";
import Image from "next/image";
import AdbIcon from "@mui/icons-material/Adb";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NextLink from "next/link";
import { red } from "@mui/material/colors";
import muiTheme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
const hostUrl = "https://story-generator.onrender.com";
import axios from "axios";

// TODO:Change to get avatar image from userID or DB
let icon = require("../assets/images/avatars/avatar_10.jpg");
icon = icon.default.src;
console.log(icon);
const pages = ["Home", "Generator"];
const pageLinkes = { Home: "/", StoryGenerator: "/storygenerator" };
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    axios
      .post(`${hostUrl}/api/auth/logout`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((data) => {
        localStorage.removeItem("token");
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Story Teller
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuBookIcon sx={{ display: { xs: "block", sm: "none" } }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {page == "Home" ? (
                      <NextLink href={pageLinkes.Home}>{page}</NextLink>
                    ) : (
                      <NextLink href={pageLinkes.StoryGenerator}>
                        {page}
                      </NextLink>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page == "Home" ? (
                  <NextLink href={pageLinkes.Home}>{page}</NextLink>
                ) : (
                  <NextLink href={pageLinkes.StoryGenerator}>{page}</NextLink>
                )}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* TODO: Fix to get icon from DB */}
                <Avatar alt="Avatar" src={icon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Button onClick={handleLogout}>Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default Header;
