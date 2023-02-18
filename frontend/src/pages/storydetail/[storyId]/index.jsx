import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Box,
  TextField,
  Chip,
  Avatar,
  Paper,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
const hostUrl = "https://story-generator.onrender.com";

const index = () => {
  const router = useRouter();

  let avatar = require("../../../assets/images/avatars/avatar_1.jpg");
  avatar = avatar.default.src;
  const storyInfo = {
    _id: router.query._id,
    title: router.query.title,
    genre: router.query.genre,
    image: router.query.image,
    keyword: router.query.keyword,
    story: router.query.story,
    createdAt: router.query.createdAt,
    user: router.query.user,
  };

  const [userComments, setUserComments] = useState([]);
  const [inputComment, setInputComment] = useState();
  const [authorName, setAuthorName] = useState("");
  const [authorImage, setAuthorImage] = useState(avatar);
  const storyId = storyInfo._id;

  const getAuthorInfo = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${hostUrl}/me`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setAuthorName(res.data.user.fullName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO:Create getComments function
  const getComments = async () => {
    // let token = localStorage.getItem("token");
    // // console.log("token", token);
    // let data = { storyId: _id };
    // axios
    //   .get(`${hostUrl}/api/comment/comments`, {
    //     headers: {
    //       "Access-Control-Expose-Headers": "uid",
    //       uid: `${storyId}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res", res.data.comments);
    //     setUserComments(res.data.comments);
    //   })
    //   .catch((err) => {
    //     console.log("Something error happened at getComments", err);
    //   });
    // try {
    //   const response = await fetch(
    //     // `/api/generate-story?word1=${word1}&word2=${word2}&word3=${word3}`
    //     `${hostUrl}/api/comment/comments`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Expose-Headers": "uid",
    //         uid: `${storyId}`,
    //       },
    //     }
    //   );
    //   const respppp = await response.json();
    //   console.log("respppp", respppp);
    //   // const { generatedStory } = await response.json();
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  useEffect(() => {
    getAuthorInfo();
    getComments();
  }, [storyId]);

  const handleChangeComment = (e) => {
    e.preventDefault();
    setInputComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!inputComment) {
      alert("Please fill all inputs");
      return;
    }

    let token = localStorage.getItem("token");
    let data = {
      comment: inputComment,
      story: storyId,
    };
    axios
      .post(`${hostUrl}/api/comment/submit-comment`, data, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setInputComment("");
        router.push("/");
      })
      .catch((err) => {
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
            {storyInfo.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Chip
              sx={{ maxWidth: "25%" }}
              avatar={<Avatar alt="Rei" src={authorImage} />}
              label={authorName}
              variant="outlined"
            />
          </Box>
        </Stack>

        <Card sx={{ width: "100%", mb: 2 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{ maxHeight: "100%" }}
            image={storyInfo.image}
          />
          <CardContent padding="1rem">
            <Chip label={storyInfo.genre} sx={{ mb: 2 }} />
            <Typography variant="subtitle1" color="text.secondary">
              {storyInfo.story}
            </Typography>
          </CardContent>
        </Card>
        <TextField
          width="100%"
          type="text"
          id=""
          label="Your comment"
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
          <Button variant="contained" onClick={handleSubmitComment}>
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
                <h4
                  style={{
                    marginBottom: "1rem",
                    marginTop: 0,
                    textAlign: "left",
                  }}
                >
                  Michel Michel
                </h4>
                {userComments.length == 0 ? (
                  <p style={{ textAlign: "left" }}>
                    "This story is very interesting! What a great brain the AI
                    having!"
                  </p>
                ) : (
                  <>
                    {userComments.map((comment) => (
                      <p style={{ textAlign: "left" }}>{comment}</p>
                    ))}
                    <p style={{ textAlign: "left", color: "gray" }}>
                      posted 1 minute ago
                    </p>
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

export default index;
