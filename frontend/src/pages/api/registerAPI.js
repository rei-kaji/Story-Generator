import axios from "axios";
// const hostUrl = "https://story-generator.onrender.com";

const registerAPI = (hostUrl, data, router) => {
  axios
    .post(`${hostUrl}/api/auth/register`, data)
    .then((res) => {
      console.log(res);
      router.push("login");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default registerAPI;
