import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// router.route("/").get((req, res) => {
//   res.send("Hello Generator");
// });

// router.route("/").post(async (req, res) => {
export const generateStory = async (req, res) => {
  try {
    const { title, keyword, genre } = req.body;
    const prompt = `Please create a new story with the following conditions. The story should be a work of fiction, no more than 1,200 words in length, and must have a clear beginning, middle, and end. The title and theme is ${title}. The genre should be ${genre}, and the story should include the key words "${keyword}". Please keep the language natural and avoid technical terms. Thank you!`;

    const {
      data: { choices },
    } = await openai.createCompletion({
      //   engine: "text-davinci-002",
      prompt,
      max_tokens: 1200,
      n: 1,
      //   stop: ".",
      model: "text-davinci-002",
      temperature: 1.0,
    });
    const generatedStory = choices[0].text.trim();

    // console.log("generatedStory", generatedStory);
    res.status(200).json({ generatedStory });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
};

export default router;
