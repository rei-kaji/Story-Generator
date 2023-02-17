import dotenv from "dotenv";
import { verifyToken, isTokenExpired } from "../service/jwt.service.js";

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header("authorization");

  console.log("token", token);
  try {
    const decoded = verifyToken(token);

    if (isTokenExpired(token)) {
      // await redisClient.del(token);
      return res.status(401).json({
        status: "fail",
        message: `Unauthorized! userId=${decoded.id}`,
      });
    }

    req.user = decoded.id;

    next();
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Unauthorized! err=${err}`,
    });
  }
};
// };

export default auth;
