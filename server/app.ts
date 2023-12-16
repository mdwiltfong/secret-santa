// api route that returns "hello world"
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";
const app = express();
app.use(bodyParser.json());
app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!!!");
});
type Error = {
  status?: number;
  message?: string;
};
app.use(function (err: Error, req: Request, res: Response) {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({ error: message });
});

export default app;
