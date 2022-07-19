import pkg from "@prisma/client";
import AppLog from "../events/AppLog.js";
import "./setup.js";

const { PrismaClient } = pkg;
const client = new PrismaClient();

exec();
export default client;

async function exec() {
  try {
    await client.$connect();
    AppLog("Server", "Connected to database");
  } catch (error) {
    AppLog("Error", `Internal error while connecting to database | ${error}`);
  }
}
