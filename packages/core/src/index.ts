import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import type { Response } from "express";
import express from "express";

import "./config/env";

import routes from "./routes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.send("Hello, world!");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on ${PORT}`);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const prisma = new PrismaClient();

process.on("SIGTERM", () => {
  console.log("SIGTERM received");

  prisma.$disconnect().catch((error) => {
    console.error("Error disconnecting from database", error);
  });

  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received");

  prisma.$disconnect().catch((error) => {
    console.error("Error disconnecting from database", error);
  });

  process.exit(0);
});
