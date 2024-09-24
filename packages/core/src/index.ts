import "dotenv/config";

import type { Response } from "express";
import express from "express";

import "./config/env";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on ${PORT}`);
});
