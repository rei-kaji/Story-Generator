import axios from "axios";
const hostUrl = "https://story-generator.onrender.com";

const loginAPI = (data, router) => {
  axios
    .post(`${hostUrl}/api/auth/login`, data)
    .then((data) => {
      const { token } = data.data;
      localStorage.setItem("token", token);
      // we will redirect to the home page
      router.push("/");
    })
    .catch((err) => {
      console.log("Something error happened at login. ", err);
    });
};

export default loginAPI;
