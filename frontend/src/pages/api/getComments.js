import axios from "axios";
const hostUrl = "https://story-generator.onrender.com";

const getComments = async ({ storyId, setUserComments }) => {
  // let token = localStorage.getItem("token");
  // console.log("token", token);
  //   let data = { storyId: _id };
  axios
    .get(`${hostUrl}/api/comment/comments`, {
      headers: {
        "Access-Control-Expose-Headers": "uid",
        uid: `${storyId}`,
      },
    })
    .then((res) => {
      // console.log("res", res.data.comments);
      setUserComments(res.data.comments);
    })
    .catch((err) => {
      console.log("Something error happened at getComments", err);
    });
};

export default getComments;

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
