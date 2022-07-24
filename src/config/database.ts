import pkg from "@prisma/client";
import AppLog from "../events/AppLog.js";
import "./setup.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

exec();
export { prisma };

async function exec() {
  try {
    await prisma.$connect();
    AppLog("Server", `Connected to database`);
  } catch (error) {
    AppLog("Error", `Internal error while connecting to database | ${error}`);
  }
}
