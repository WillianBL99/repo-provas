import { PrismaClient } from "@prisma/client";
import AppLog from "../events/AppLog.js";

export let prisma: PrismaClient;

export function connectDb() {
  if (!prisma) {
    try {
      prisma = new PrismaClient();
      AppLog("Service", "Connected to database");
    } catch (error) {
      AppLog("Error", "Failed to connect to database");
    }
  }
}

export async function disconnectDb() {
  if (prisma) {
    await prisma.$disconnect();
    AppLog("Service", "Disconnected from database");
  }
}
