// import {useHostUrl} from '../../contexts/HostUrlContext';

const hostUrl = "https://story-generator.onrender.com";
const generateStoryAPI = async (title, keyWord, genre, setGenerateStory) => {
  const response = await fetch(
    // `/api/generate-story?word1=${word1}&word2=${word2}&word3=${word3}`
    `${hostUrl}/api/generate-story`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        keyword: keyWord,
        genre: genre,
      }),
    }
  );
  const { generatedStory } = await response.json();
  // console.log("generatedStory", generatedStory);
  setGenerateStory(generatedStory);
  // console.log("generatedStory", generatedStory);
};

export default generateStoryAPI;
