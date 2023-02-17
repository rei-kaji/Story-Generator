import dotenv from "dotenv";
import { verifyToken, isTokenExpired } from "../service/jwt.service.js";

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header("authorization");

  try {
    const decoded = verifyToken(token);

    if (isTokenExpired(token)) {
      // await redisClient.del(token);
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized!",
      });
    }

    req.user = decoded.id;

    next();
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Unauthorized!",
    });
  }
};
// };

export default auth;
