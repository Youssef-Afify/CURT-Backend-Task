import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { DatabaseError } from "pg";
import {
    BadRequestError,
    NotFoundError,
    ConflictError,
    UnauthorizedError,
    ForbiddenError,
} from "../../core/errors/appError";

export function errorMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    if (err instanceof ZodError) {
        res.status(400).json({
            error: "Validation failed",
            details: err.issues,
        });
        return;
    }

    if (err instanceof BadRequestError) {
        res.status(400).json({ error: err.message });
        return;
    }
	
	if (err instanceof UnauthorizedError) {
		res.status(401).json({ error: err.message });
		return;
	}

	if (err instanceof ForbiddenError) {
		res.status(403).json({ error: err.message });
		return;
	}

    if (err instanceof NotFoundError) {
        res.status(404).json({ error: err.message });
        return;
    }

    if (err instanceof ConflictError) {
        res.status(409).json({ error: err.message });
        return;
    }

    if (err instanceof DatabaseError) {
        switch (err.code) {
            case "23503": // foreign_key_violation
                res.status(400).json({
                    error: "Referenced record does not exist",
                    detail: err.detail,
                });
                return;
            case "23505": // unique_violation
                res.status(409).json({
                    error: "Record already exists",
                    detail: err.detail,
                });
                return;
            case "23514": // check_violation
                res.status(400).json({
                    error: "Request violates a database constraint",
                    detail: err.detail ?? err.message,
                });
                return;
            case "22P02": // invalid_text_representation (e.g. malformed UUID)
                res.status(400).json({ error: "Invalid id or field format" });
                return;
            case "23502": // not_null_violation
                res.status(400).json({
                    error: "Missing required field",
                    detail: err.column,
                });
                return;
        }
    }

    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}
