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
import Header from "@/components/Header";
import Loader from "@/components/Loader";

// ----------------------------------------------------------------------

const loginImage = require("../../assets/illustration_login.png");

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {
      email: userEmail,
      password: userPassword,
    };

    try {
      loginAPI(data, router);
    } catch (error) {
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
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
    <>
      <Header props={true} />
      {loading ? (
        <Loader />
      ) : (
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
            <Image src={loginImage} width="100%" height="100%" alt="logo" />
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
              <Typography variant="body1" color="GrayText">
                Please use the following email and password for trial.
                <br />
                <span>
                  email: trial@gmail.com <br />
                  password: 12345
                </span>
              </Typography>
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
      )}
    </>
  );
};

export default Login;
