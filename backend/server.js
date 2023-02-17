import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import openAIRoutes from "./routes/openAI.route.js";
import commentRoutes from "./routes/comment.route.js";
import storyRoutes from "./routes/story.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "uid",
    "access-control-expose-headers",
  ],
  exposedHeaders: ["access-control-expose-headers"],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

// app.use("/api/post", postRoutes);
app.use("/api/generate-story", openAIRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/story", storyRoutes);
app.use("/", userRoutes);

// app.get("/", async (req, res) => {
//   res.send("Hello Beautiful World!");
// });

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
