const express = require("express");

/**
 * Routes
 */
const assets = require("./routes/assets-route.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/assets", assets);

app.listen(PORT, () => {
  console.log(`Restarted the server successfully on port ${PORT}`);
});
