import bodyParser from "body-parser";
import express from "express";
import deviceApi from "./api/deviceApi";
import { setupDB } from "./db/client";
const app = express();
const port = process.env.PORT ?? 9000;

const startServer = async () => {
  try {
    await setupDB();
  } catch (error) {
    console.error("failed to setup DB", error);
    process.exit(1);
  }

  app.use(bodyParser.json());

  app.get("/health", (req, res) => {
    res.sendStatus(200);
  });

  app.use("/devices", deviceApi);

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res.status(500).json({ message: "Internal server error" });
    }
  );

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
};

startServer();
