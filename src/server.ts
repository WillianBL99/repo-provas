import { Request, Response } from "express";
import app, { init } from "./app.js";
import { loadEnv } from "./config/envs.js";
import AppLog from "./events/AppLog.js";
loadEnv();

const PORT = process.env.PORT || 5000;

init().then(() => {
  app.get("/", async (_req: Request, res: Response) => res.send("Online"));
  app.listen(PORT, () => {
    AppLog("Server", `Server listening on port ${PORT}`);
  });
});
