import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import openAIRoutes from "./routes/openAIRoutes.js";
// import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// app.use("/api/post", postRoutes);
app.use("/api/generate-story", openAIRoutes);

app.get("/", async (req, res) => {
  res.send("Hello Beautiful World!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
