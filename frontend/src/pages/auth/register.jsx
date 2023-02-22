import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Select from "react-select";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Container,
  Divider,
  Typography,
  MenuItem,
  ImageList,
  ImageListItem,
  RadioGroup,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import axios from "axios";
import registerAPI from "../api/registerAPI";
// components
// import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const hostUrl = "https://story-generator.onrender.com";
const avatarOption = [];
for (let i = 1; i < 22; i++) {
  let avatarImage = require(`../../assets/images/avatars/avatar_${i}.jpg`);
  avatarOption.push({ name: `Avatar ${i}`, url: avatarImage });
}

const loginImage = require("../../assets/illustration_login.png");

const avatarOptionComp = (item) => (
  <Box>
    <Image
      src={item.default.src}
      alt={item}
      width={40}
      height={40}
      referrerPolicy="no-referrer"
    />
  </Box>
);

const Register = () => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [avatar, setAvatar] = useState("");

  // console.log("avatar", avatar);

  const handleClick = (e) => {
    e.preventDefault();
    if (!userEmail || !userFullName || !userPassword) {
      alert("Please fill all inputs");
      return;
    }

    let data = {
      fullName: userFullName,
      email: userEmail,
      password: userPassword,
      avatar: avatar,
    };
    registerAPI(hostUrl, data, router);
  };

  // const handleChangeAvatar = (e) => {
  //   e.preventDefault;
  //   setAvatar(e.target.value);
  // };

  const handleUserFullName = (e) => {
    e.preventDefault();
    setUserFullName(e.target.value);
  };
  const handleUserEmail = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };
  const handleUserPassword = (e) => {
    e.preventDefault();
    setUserPassword(e.target.value);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "2rem",
        padding: "1.5rem",
      }}
    >
      <Container
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Image src={loginImage} width="100%" height="100%" alt="loginImage" />
      </Container>
      <Container
        style={{
          marginTop: "2rem",
          // // backgroundColor: "#CEEC97",
          // padding: "1.5rem",
        }}
      >
        <Typography variant="h4" mb={2}>
          Let's start your story journey!
        </Typography>
        <Stack spacing={3} mb={2}>
          <TextField
            name="name"
            label="Your full name"
            onChange={handleUserFullName}
          />
          <TextField
            name="email"
            label="Email address"
            onChange={handleUserEmail}
          />
          <TextField
            name="password"
            label="Password"
            onChange={handleUserPassword}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {/* <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  /> */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleClick}
          >
            Register
          </LoadingButton>
        </Stack>
        <Typography
          variant="body2"
          sx={{ display: "flex", justifyContent: "right" }}
        >
          Have you already your account?
          <Link ml={1}>
            <NextLink variant="subtitle2" href={"login"}>
              Login
            </NextLink>
          </Link>
        </Typography>
      </Container>
    </Container>
  );
};

export default Register;
