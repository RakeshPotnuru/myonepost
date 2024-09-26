import { Router } from "express";

import postRoutes from "./modules/post/post.routes";
import userRoutes from "./modules/user/user.routes";

const router = Router();

router.use("/post", postRoutes);
router.use("/user", userRoutes);

export default router;
