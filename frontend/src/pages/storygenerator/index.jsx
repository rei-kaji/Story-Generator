import React, { useState } from "react"; // @mui
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

// const hostUrl = "https://ai-image-generator-8u1r.onrender.com";
const hostUrl = "https://story-generator.onrender.com";

const genres = ["Science Fiction", "Horror"];

const index = () => {
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [keyWord, setKeyWord] = useState();
  const [generateStory, setGenerateStory] = useState(
    "Generated story will be here."
  );
  const [generating, setGenerating] = useState(false);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeKeyWord = (e) => {
    setKeyWord(e.target.value);
  };
  const handleChangeGenre = (e) => {
    setGenre(e.target.value);
  };

  const generatingStory = async (event) => {
    if (title && genre && keyWord) {
      event.preventDefault();
      try {
        setGenerating(true);
        const response = await fetch(
          // `/api/generate-story?word1=${word1}&word2=${word2}&word3=${word3}`
          `${hostUrl}/api/generate-story`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              keyword: keyWord,
              genre: genre,
            }),
          }
        );
        const { generatedStory } = await response.json();
        console.log("generatedStory", generatedStory);
        setGenerateStory(generatedStory);
        console.log("generatedStory", generatedStory);
      } catch (err) {
        alert(err);
      } finally {
        setGenerating(false);
      }
    } else {
      alert("Please all of input.");
    }
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
          alignItems="left"
          justifyContent="space-between"
          mb={5}
          gap={5}
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
          <Button variant="outlined" onClick={generatingStory}>
            Run Story Generator
          </Button>
          {generating ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="secondary" />
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
                    {generateStory.length} / 1200
                  </Typography>
                </Grid>
              )}
            </Box>
          )}
          <Button variant="contained">Share your story</Button>
        </Stack>
      </Container>
    </>
  );
};

export default index;