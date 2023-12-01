// simple express server that returns "Hello world" at http://localhost:3000
import express from "express";
import { Request, Response } from "express";

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
