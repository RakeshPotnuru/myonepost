import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

const verifyJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expected format: 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyJWT;
