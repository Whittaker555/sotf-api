import express, { Request, Response } from "express";
import auth from "./routes/auth";
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/api", auth);

app.use((_req, res, _next): any => {
  const error: any = new Error("Not Found");
  error.status = 404;
  return res.status(404).json({
    message: error.message,
  });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running. http://localhost:${PORT}`);
// });

module.exports.handler = serverless(app);
