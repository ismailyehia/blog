import app from "./app";
import { logger } from "./lib/logger";
import { connectDB } from "@workspace/db";

const port = Number(process.env["PORT"] || "8080");

// Start server first so Render detects the port
const server = app.listen(port, "0.0.0.0", () => {
  logger.info({ port }, "Server listening on port");
  
  // Now attempt to connect to the database
  connectDB()
    .then(() => {
      logger.info("Successfully connected to MongoDB");
    })
    .catch((err) => {
      logger.error({ err }, "Failed to connect to MongoDB - the app may not function correctly");
      // Don't exit here, let the developer see the error in logs and Render keep the service "up"
    });
});

server.on('error', (err) => {
  logger.error({ err }, "Server failed to start");
  process.exit(1);
});
