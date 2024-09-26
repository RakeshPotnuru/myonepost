import { Router } from "express";

import UserController from "./user.controller";

const router = Router();

router.post("/create", new UserController().createUserHandler);

export default router;
