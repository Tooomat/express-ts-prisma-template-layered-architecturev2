import { config } from "./config/env";
import { logger } from "./infrastructure/logging";
import { webApp } from "./infrastructure/server";

const app = webApp

app.listen(config.APP_PORT, () => {
  logger.info(`🚀 Server running on port ${config.APP_PORT}`);
});
