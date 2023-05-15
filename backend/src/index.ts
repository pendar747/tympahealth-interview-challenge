import express from "express";
import deviceApi from "./api/deviceApi";
import { setupDB } from "./db/client";
const app = express();
const port = process.env.PORT ?? 3000;

const startServer = async () => {
  try {
    await setupDB();
  } catch (error) {
    console.error("failed to setup DB", error);
    process.exit(1);
  }

  app.get("/health", (req, res) => {
    res.sendStatus(2000);
  });

  app.use("/device", deviceApi);

  app.use((err, res) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
};

startServer();
