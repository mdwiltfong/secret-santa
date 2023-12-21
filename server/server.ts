import app from "./app";
import config from "../server/utils/Config";
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
