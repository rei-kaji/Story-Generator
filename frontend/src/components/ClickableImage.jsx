import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import generateImage from "../pages/api/generateImage.js";
const hostUrl = "https://story-generator.onrender.com";
import Loader from "@/components/Loader";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const ImageStyled = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const ClickableImage = ({
  image,
  setGeneratedImage,
  setGeneratingImage,
  imagePrompt,
}) => {
  const startGenerateImage = (e) => {
    e.preventDefault();
    if (!imagePrompt) {
      alert("Please input!");
      return;
    }
    // console.log("Clicked generatingImage. imagePrompt: ", imagePrompt);
    try {
      generateImage({
        setGeneratedImage,
        setGeneratingImage,
        hostUrl,
        imagePrompt,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: "auto",
        width: "100%",
      }}
    >
      <ImageButton
        focusRipple
        key={image.title}
        style={{
          width: image.width,
          height: image.height,
        }}
        onClick={startGenerateImage}
      >
        <PhotoSizeSelectActualOutlinedIcon
          sx={{
            position: "center",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: "10rem",
            height: "10rem",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: "0.3",
          }}
        />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <ImageStyled>
          <Typography
            component="span"
            variant="h6"
            color="#00695c"
            sx={{
              position: "relative",
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
            }}
          >
            {image.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </ImageStyled>
      </ImageButton>
    </Box>
  );
};

export default ClickableImage;
