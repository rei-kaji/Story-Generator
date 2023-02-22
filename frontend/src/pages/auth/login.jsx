import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import loginAPI from "../api/loginAPI";

// ----------------------------------------------------------------------

const loginImage = require("../../assets/illustration_login.png");

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    let data = {
      email: userEmail,
      password: userPassword,
    };

    loginAPI(data, router);
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
        <Image src={loginImage} width="100%" height="100%" />
      </Container>
      <Container
        style={{
          marginTop: "2rem",
          // // backgroundColor: "#CEEC97",
          // padding: "1.5rem",
        }}
      >
        <Typography variant="h4" mb={2}>
          Enjoy your story journey!
        </Typography>
        <Stack spacing={3} mb={2}>
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
            Login
          </LoadingButton>
        </Stack>
        <Typography
          variant="body2"
          sx={{ display: "flex", justifyContent: "right" }}
        >
          Don’t have an account?
          <Link ml={1}>
            <NextLink variant="subtitle2" href={"register"}>
              Register
            </NextLink>
          </Link>
        </Typography>
      </Container>
    </Container>
  );
};

export default Login;
