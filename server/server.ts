import app from "./app";
import config from "./utils/Config";
const PORT = config.PORT || 3000;
const HOSTNAME = "0.0.0.0";
app.listen(PORT, HOSTNAME, () => {
  console.log(`server started at http://${HOSTNAME}:${PORT}`);
});
