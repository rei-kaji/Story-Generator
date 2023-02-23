import axios from "axios";
// const hostUrl = "https://story-generator.onrender.com";

const submitComment = (hostUrl, token, data, router) => {
  axios
    .post(`${hostUrl}/api/comment/submit-comment`, data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default submitComment;
