import app from "./app";
import config from "./utils/Config";
import path from "path";
import express from "express";
const PORT = config.PORT || 3000;
const HOSTNAME = "0.0.0.0";
console.log("__dirname is: ", __dirname);

let staticPath: string;
process.env.NODE_ENV == "production"
  ? (staticPath = path.join(__dirname, "../../client/dist"))
  : (staticPath = path.join(__dirname, "../../client/dist"));
console.log("staticPath is: ", staticPath);
app.use(express.static(staticPath));
app.listen(PORT, HOSTNAME, () => {
  console.log(`server started at http://${HOSTNAME}:${PORT}`);
});
