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
// components
// import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const loginImage = require("../../assets/illustration_login.png");

const Register = () => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    // navigate("/dashboard", { replace: true });
    router.push("/");
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
          Let's start your story journey!
        </Typography>
        <Stack spacing={3} mb={2}>
          <TextField name="name" label="Your full name" />
          <TextField name="email" label="Email address" />

          <TextField
            name="password"
            label="Password"
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
