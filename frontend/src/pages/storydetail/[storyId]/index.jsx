import React, { useState } from "react";
import { useRouter } from "next/router";
// @mui
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
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const index = ({ post }) => {
  const router = useRouter();

  // const idD = router.query.id;
  let {
    id,
    cover,
    title,
    genre = "SF",
    comment,
    commentCount,
    keyWord = "Sord",
    generateStory = "Hellooo",
    author = "Rei Kaji",
    createdAt,
  } = router.query;
  const [inputComment, setInputComment] = useState();
  const avatar = require("../../../assets/images/avatars/avatar_1.jpg");
  // const [genre, setGenre] = useState();
  // const [keyWord, setKeyWord] = useState();
  author = "Rei Kaji";

  const handleChangeComment = (e) => {
    e.preventDefault();
    setInputComment(e.target.value);
  };

  const handleSubmitComment = () => {};
  return (
    <>
      <Container
        style={{
          marginTop: "2rem",
          // backgroundColor: "#CEEC97",
          padding: "1.5rem",
        }}
      >
        <Stack direction={"column"} mb={2}>
          <Typography
            variant="h5"
            mb={"1rem"}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Chip
              sx={{ maxWidth: "25%" }}
              avatar={<Avatar alt="Rei" src="/static/images/avatar/1.jpg" />}
              label={author}
              variant="outlined"
            />
          </Box>
        </Stack>

        <Card sx={{ width: "100%", mb: 2 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{ maxHeight: "100%" }}
            image={cover}
          />
          <CardContent padding="1rem">
            <Chip label={genre} sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {generateStory}
            </Typography>
          </CardContent>
        </Card>
        <TextField
          width="100%"
          type="text"
          id=""
          label="Your comment"
          value={""}
          onChange={handleChangeComment}
          fullWidth
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "right",
            marginTop: "2rem",
          }}
        >
          <Button variant="outlined" onClick={handleSubmitComment}>
            Submit your comment
          </Button>
        </Box>
        <Stack direction="column">
          <h1>Comments</h1>
          <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={avatar} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                  vehicula laoreet. Suspendisse congue vulputate lobortis.
                  Pellentesque at interdum tortor. Quisque arcu quam, malesuada
                  vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
                  ligula nec faucibus. In elit metus, efficitur lobortis nisi
                  quis, molestie porttitor metus. Pellentesque et neque risus.
                  Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
                  vehicula urna, nec feugiat quam lectus vitae ex.{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

export default index;
