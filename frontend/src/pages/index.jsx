import React, { useEffect, useState } from "react"; // @mui
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
import Head from "next/head.js";
import axios from "axios";
import { useRouter } from "next/router.js";
import getAllStories from "./api/getAllStories.js";
import Loader from "@/components/Loader/index.jsx";
// import { useHostUrl } from "@/contexts/hostUrlContext.js";
// const hostUrl = useHostUrl();

// console.log("hostUrl", hostUrl);

const Home = () => {
  const router = useRouter();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const SORT_OPTIONS = [
    { value: "latest", label: "Latest" },
    { value: "popular", label: "Popular" },
    { value: "oldest", label: "Oldest" },
  ];

  useEffect(() => {
    // console.log("loading", loading);
    getAllStories(setStories, router, setLoading);
  }, []);

  // useEffect(() => {
  //   console.log("stories", stories);
  //   setLoading(false);
  // }, [stories]);

  return (
    <>
      <main>
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
              bottom: "3.5rem",
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
          {loading ? (
            <Loader />
          ) : (
            <Grid container spacing={3}>
              {stories.map((post, index) => (
                <StoryPostCard key={post._id} post={post} index={index} />
              ))}
            </Grid>
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
