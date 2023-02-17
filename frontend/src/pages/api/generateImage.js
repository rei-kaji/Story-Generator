const generateImage = async ({ setGeneratedImage, hostUrl, imagePrompt }) => {
  console.log("Start generateImage", imagePrompt);
  if (!imagePrompt) {
    alert("Please input!");
    return;
  }

  try {
    const response = await fetch(
      `${hostUrl}/api/generate-story/generate-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: imagePrompt,
        }),
      }
    );

    const data = await response.json();
    setGeneratedImage(`data:image/jpeg;base64,${data.photo}`);
  } catch (err) {
    alert(err);
  }
};

export default generateImage;
