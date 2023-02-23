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
import getComments from "../../api/getComments.js";
import getAuthorInfo from "../../api/getAuthorInfo.js";
import submitComment from "@/pages/api/submitComment.js";
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

  useEffect(() => {
    getAuthorInfo(setAuthorName);
    // console.log(storyInfo);
    if (userComments.length == 0) {
      getComments({ storyId, setUserComments });
    }
  }, [storyInfo._id]);

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

    submitComment(hostUrl, token, data, router);
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
          {/* TODO: Fix the authorName to real author name from logined user */}
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
          {userComments.map((comment) => (
            <>
              <Paper style={{ padding: "40px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={avatar} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4
                      key={comment.id}
                      style={{
                        marginBottom: "1rem",
                        marginTop: 0,
                        textAlign: "left",
                      }}
                    >
                      {comment.user}
                    </h4>
                    <p key={comment.id}>{comment.comment}</p>
                  </Grid>
                </Grid>
              </Paper>
            </>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default index;
