import React from "react"; // @mui
import { Grid, Button, Container, Stack, Typography, Fab } from "@mui/material";
// components
import Iconify from "../components/iconify.jsx";
import {
  StoryPostCard,
  StoryPostsSort,
  StoryPostsSearch,
} from "../components/home/index.js";
// TODO: Change to import from MongoDB
import POSTS from "../components/home/blog.js";
import Link from "next/link.js";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
  const SORT_OPTIONS = [
    { value: "latest", label: "Latest" },
    { value: "popular", label: "Popular" },
    { value: "oldest", label: "Oldest" },
  ];
  return (
    <>
      <Container style={{ marginTop: "2rem" }}>
        <Fab
          variant="extended"
          aria-label="add"
          color="primary"
          style={{
            display: "block",
            zIndex: "20",
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "2rem",
            backdropFilter: "blur(15px)",
            opacity: "0.9",
          }}
        >
          <AddIcon />
          <Link href={"/storygenerator"}>New Post</Link>
        </Fab>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <StoryPostsSearch posts={POSTS} />
          <StoryPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <StoryPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
