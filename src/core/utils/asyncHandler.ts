import { Request, Response, NextFunction, RequestHandler } from "express";

// Express does not automatically catch rejected promises from async
// route handlers - without this, a thrown error in an async controller
// method would hang the request instead of reaching your error middleware.
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
