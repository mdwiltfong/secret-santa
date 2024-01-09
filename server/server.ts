import app from "./app";
import config from "./utils/Config";
import path from "path";
import express from "express";
const PORT = config.PORT || 3000;
const HOSTNAME = "0.0.0.0";
console.log("__dirname is: ", __dirname);
console.log(path.join(__dirname, "../../client/dist"));
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.listen(PORT, HOSTNAME, () => {
  console.log(`server started at http://${HOSTNAME}:${PORT}`);
});
