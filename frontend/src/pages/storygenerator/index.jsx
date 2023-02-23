import React, { useEffect, useState } from "react"; // @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Select,
  MenuItem,
  InputBase,
  Chip,
  CircularProgress,
  LinearProgress,
} from "@mui/material";

import Link from "next/link.js";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import ClickableImage from "@/components/ClickableImage";
import generateStoryAPI from "../api/generateStoryAPI";
import Loader from "@/components/Loader";
// import { useHostUrl } from "@/contexts/hostUrlContext.js";
// const hostUrl = useHostUrl();

// console.log("hostUrl", hostUrl);

const hostUrl = "https://story-generator.onrender.com";
let previewImage = require("../../assets/images/preview.png");
previewImage = previewImage.default.src;

let imageButton = {
  url: previewImage,
  title: "Click and Generate Image",
  width: "20rem",
  height: "20rem",
};

const genres = [
  "Romance",
  "Adventure",
  "Fantasy",
  "Suspense",
  "Mystery",
  "SF",
  "Horror",
];
let imagePrompt;
const index = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [generateStory, setGenerateStory] = useState(
    "Generated story will be here."
  );
  const [generatedImage, setGeneratedImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleChangeKeyWord = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value);
  };
  const handleChangeGenre = (e) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  useEffect(() => {
    imagePrompt = `Please create image following these condition. Title is ${title}. Keyword is ${keyWord}. Genre is ${genre}.`;
  }, [genre, title, keyWord]);

  useEffect(() => {
    console.log("generatingImage", generatingImage);
  }, [generatingImage]);

  const generatingStory = async (event) => {
    if (title && genre && keyWord) {
      event.preventDefault();
      // console.log("title", title);
      imagePrompt = `Please create image following these condition. Title is ${title}. Keyword is ${keyWord}. Genre is ${genre}.`;
      // console.log("imagePrompt", imagePrompt);
      // TODO: Add loading image
      try {
        generateStoryAPI(
          title,
          keyWord,
          genre,
          setGenerateStory,
          setGenerating
        );
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please all of input.");
    }
  };

  const handleShareStory = (e) => {
    e.preventDefault();
    if (!title || !genre || !keyWord || !generateStory || !generatedImage) {
      alert("Please fill all inputs");
      return;
    }

    let token = localStorage.getItem("token");
    console.log(token);
    let data = {
      title: title,
      genre: genre,
      keyword: keyWord,
      story: generateStory,
      image: generatedImage,
    };
    setUploading(true);
    axios
      .post(`${hostUrl}/api/story/upload`, data, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        router.replace("/");
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Container
        style={{
          marginTop: "2rem",
          // backgroundColor: "#CEEC97",
          padding: "1.5rem",
        }}
      >
        <Typography
          variant="h5"
          mb={"2rem"}
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            // letterSpacing: ".3rem",
            color: "inherit",
          }}
        >
          Let's generate your story
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          // direction="column"
          // alignItems="left"
          // justifyContent="space-between"
          // mb={5}
          // gap={5}
          // flex={1}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Title"
              id="title"
              // helperText="Input your story's title"
              onChange={(e) => {
                handleChangeTitle(e);
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              // height: "5rem",
            }}
          >
            <TextField
              fullWidth
              label="Key Word"
              id="keyword"
              helperText="Input your story's keyword. ex. Sunday, Fire works, etc..."
              onChange={(e) => {
                handleChangeKeyWord(e);
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="genreLabel">Genre</InputLabel>
              <Select
                labelId="genreLabel"
                id="genreSelect"
                value={genre}
                label="Genre"
                onChange={(e) => {
                  handleChangeGenre(e);
                }}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            onClick={generatingStory}
            sx={{ width: "100%" }}
          >
            Run Story Generator
          </Button>
          {generating ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="secondary" />{" "}
              <Typography style={{ color: "red", mt: "1.5rem" }}>
                * Sometimes it is necessary to wait a few minutes...
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
              }}
            >
              {generateStory.length < 50 ? (
                <Typography style={{ color: "#00695c" }}>
                  {generateStory}
                </Typography>
              ) : (
                <Grid
                  justifyContent="left"
                  item
                  xs
                  zeroMinWidth
                  border={"1px solid lightgray"}
                  borderRadius={"5px"}
                  padding={"1.5rem"}
                >
                  <Typography variant="h4" style={{ textAlign: "left" }}>
                    {title}
                  </Typography>
                  <Chip label={genre} sx={{ mb: 3, mt: 3 }} />
                  <Typography variant="body1" style={{ textAlign: "left" }}>
                    {generateStory}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      textAlign: "left",
                      color: "gray",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    {generateStory.length} / 2000
                  </Typography>
                </Grid>
              )}
            </Box>
          )}
          <Box
            sx={{
              minWidth: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <>
              {generatingImage ? (
                <>
                  <Loader />
                </>
              ) : (
                <>
                  {generatedImage.length < 5 ? (
                    <ClickableImage
                      image={imageButton}
                      setGeneratedImage={setGeneratedImage}
                      setGeneratingImage={setGeneratingImage}
                      imagePrompt={imagePrompt}
                    />
                  ) : (
                    <Image
                      src={generatedImage}
                      alt="preview"
                      width="500"
                      height="500"
                      className="w-9/12 h-9/12 origin-contain"
                    />
                  )}
                </>
              )}
            </>
          </Box>
        </Stack>
      </Container>
      <Stack alignItems="center" justifyContent="space-between">
        {uploading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleShareStory}>
              Share your story
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};

export default index;
