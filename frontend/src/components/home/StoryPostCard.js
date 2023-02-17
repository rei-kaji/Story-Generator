import PropTypes from "prop-types";
import NextLink from "next/link";
import { useRouter } from "next/router";

// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Checkbox,
  Rating,
  Button,
} from "@mui/material";
// utils
// import { fDate } from "../../utils/formatTime";
// import { fShortenNumber } from "../../utils/formatNumber";
//
// import SvgColor from "../svg-color";
// import Iconify from "../iconify.jsx";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useState } from "react";
// import Image from "next/image";

const avatarInfo = require("../../assets/images/avatars/avatar_1.jpg");
const avatarInfo2 = avatarInfo.default;
const avatar = avatarInfo2.src;
// console.log("avatar", avatar);

// ----------------------------------------------------------------------

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  cursor: "pointer",
  color: "#00695c",
  fontSize: "1rem",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

StoryPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const query = {
  id: 1,
  name: "yakkun",
};

export default function StoryPostCard({ post, index }) {
  const router = useRouter();
  const postedData = post;
  const { id, title, genre, image, keyword, story } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const handleShowDetail = () => {
    console.log("post", post);
    router.push({
      pathname: `/storydetail/${id}`,
      query: postedData,
    });
  };

  // const POST_INFO = [
  //   { number: 200, icon: "eva:message-circle-fill" },
  //   // { number: view, icon: "eva:eye-fill" },
  //   // { number: share, icon: "eva:share-fill" },
  // ];

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card sx={{ position: "relative" }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: (theme) =>
                  alpha(theme.palette.grey[500], 0.52),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          {/* <SvgColor
            color="paper"
            src="../../assets/icons/shape-avatar.svg"
            // width={80}
            // height={36}
            // zIndex={9}
            // bottom={-15}
            // position={"absolute"}
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          /> */}
          <StyledAvatar
            alt={author.name}
            // src=
            src={avatar}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <StyledCover alt={title} src={avatar} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Typography
            // gutterBottom

            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {createdAt}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: "h5", height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
            }}
            onClick={handleShowDetail}
          >
            {/* <NextLink href={`/storydetail/${id}`}>{title}</NextLink> */}
            {/* <Button onClick={handleShowDetail}>{title}</Button> */}
            {title}

            {/* <NextLink
              as={`storydetail`}
              href={{ pathname: `/storydetail/${id}`, query: postedData }}
            >
              <p>Secondへ遷移する</p>
            </NextLink> */}
          </StyledTitle>

          <StyledInfo>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // ml: index === 0 ? 0 : 1.5,
                ...((latestPostLarge || latestPost) && {
                  color: "grey.500",
                }),
              }}
            >
              {/* <Iconify
                  icon={info.icon}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                /> */}
              {/* <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                /> */}
              <ChatOutlinedIcon sx={{ width: 20, height: 20, mr: 0.5 }} />
              <Typography variant="caption">
                {/* {fShortenNumber(info.number)} */}
                {commentCount}
              </Typography>
            </Box>
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
