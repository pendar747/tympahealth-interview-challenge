import express from "express";
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

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
};

startServer();
