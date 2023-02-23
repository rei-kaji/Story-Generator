const generateImage = async ({
  setGeneratedImage,
  setGeneratingImage,
  hostUrl,
  imagePrompt,
}) => {
  console.log("Start generateImage", imagePrompt);

  setGeneratingImage(true);
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
    setGeneratingImage(false);
  } catch (err) {
    alert(err);
    setGeneratingImage(false);
  }
};

export default generateImage;
