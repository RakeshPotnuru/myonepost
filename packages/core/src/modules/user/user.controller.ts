import type { Request, Response } from "express";

import UserService from "./user.service";

export default class UserController extends UserService {
  listUsersHandler = async (_req: Request, res: Response) => {
    try {
      const users = await super.listUsers();

      res.status(200).json(users);
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Error listing users" });
    }
  };
}
