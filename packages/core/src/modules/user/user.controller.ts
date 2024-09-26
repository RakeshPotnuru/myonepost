import type { Request, Response } from "express";

import { zParse } from "../../middlewares/validate";
import { UserCreateInputSchema } from "../../zod";
import UserService from "./user.service";

export default class UserController extends UserService {
  createUserHandler = async (req: Request, res: Response) => {
    try {
      const input = await zParse(UserCreateInputSchema, req.body);
      const user = await super.createUser(input);

      res.status(201).json(user);
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Error creating user" });
    }
  };
}
