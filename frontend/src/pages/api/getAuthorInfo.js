import axios from "axios";
const hostUrl = "https://story-generator.onrender.com";

const getAuthorInfo = (setAuthorName) => {
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

export default getAuthorInfo;
