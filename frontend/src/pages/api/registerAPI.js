const registerAPI = (hostUrl, data, router) => {
  axios
    .post(`${hostUrl}/api/auth/register`, data)
    .then((res) => {
      console.log(res);
      router.push("auth/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default registerAPI;
