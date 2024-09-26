import { Router } from "express";

import PostController from "./post.controller";

const createRouter = Router();
createRouter.post("/text", new PostController().createTestPostHandler);

const router = Router();
router.use("/create", createRouter);

export default router;
