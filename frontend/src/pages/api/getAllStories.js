import axios from "axios";
const hostUrl = "https://story-generator.onrender.com";

const getAllStories = (setStories, router, setLoading) => {
  let token = localStorage.getItem("token");
  setLoading(true);
  axios
    .get(`${hostUrl}/api/story/stories`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      if (!res.data.stories) {
        alert("You have to login first!");
        router.push("/auth/login");
      }
      setLoading(false);
      setStories(res.data.stories);
    })
    .catch((err) => {
      router.push("/auth/login");
      console.log(err);
    });
};

export default getAllStories;
