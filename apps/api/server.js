const express = require("express");
const logger = require("./logger/logger.js");

const { migrate } = require("./database/scripts/db-migrate.js");
const { errorHandler } = require("./error/error-handler.js");

/**
 * Routes
 */
const assets = require("./routes/assets-route.js");
const liabilities = require('./routes/liabilities-route.js');
const market = require('./routes/market-route.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/assets", assets);
app.use('/api/liabilities', liabilities);
app.use('/api/market', market);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.log(`Restarted the server successfully on port ${PORT}`);
  migrate({ clear: false});
});

