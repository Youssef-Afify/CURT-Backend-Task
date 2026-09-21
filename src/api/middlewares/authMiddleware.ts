import { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { IAuthMiddleware } from "../../core/iMiddlewares/iAuthMiddleware";
import { userContextStorage } from "../../business/contextVars/user.context";

const jwks = createRemoteJWKSet(new URL(process.env.NEON_AUTH_JWKS_URL!));
const issuer = new URL(process.env.NEON_AUTH_BASE_URL!).origin;

interface VerifiedSession {
  userId: string;
}

async function verifySession(token: string): Promise<VerifiedSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, jwks, { issuer });
    if (typeof payload.sub !== "string") return null;
    return { userId: payload.sub };
  } catch {
    return null;
  }
}

export class AuthMiddleware implements IAuthMiddleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization; // expected: "Bearer <token>"
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";

    const session = await verifySession(token);
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    userContextStorage.run({ userId: session.userId, token }, () => next());
  }
}