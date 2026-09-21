import { AsyncLocalStorage } from "node:async_hooks";
import { UnauthorizedError } from "../../core/errors/appError";

export interface RequestUserContext {
  userId: string;
  token: string;
}

export const userContextStorage = new AsyncLocalStorage<RequestUserContext>();

export function getCurrentUserId(): string | undefined {
  return userContextStorage.getStore()?.userId;
}

export function getCurrentToken(): string | undefined {
  return userContextStorage.getStore()?.token;
}

export function requireCurrentUserId(): string {
  const userId = getCurrentUserId();
  if (userId == null) {
    throw new UnauthorizedError("No authenticated user in the current request context");
  }
  return userId;
}

export function requireCurrentToken(): string {
  const token = getCurrentToken();
  if (token == null) {
    throw new UnauthorizedError("No authenticated session in the current request context");
  }
  return token;
}