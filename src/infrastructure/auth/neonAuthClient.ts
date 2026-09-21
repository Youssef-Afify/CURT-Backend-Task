import { decodeJwt } from "jose";
import { INeonAuthClient, NeonAuthResult } from "../../core/iClients/iNeonAuthClient";
import { UnauthorizedError, BadRequestError } from "../../core/errors/appError";

const BASE_URL = process.env.NEON_AUTH_BASE_URL!;

// Better Auth requires an Origin header on every request as a CSRF-style
// check (it validates against the branch's trusted-domains list - dev
// origins like localhost are trusted automatically, no console config
// needed for local testing). Browsers attach Origin automatically;
// Node's fetch does NOT, so it has to be set explicitly here or every
// call fails with MISSING_ORIGIN. Defaults to this server's own address
// - override with APP_ORIGIN if that's ever wrong (e.g. behind a proxy).
const APP_ORIGIN = process.env.APP_ORIGIN ?? `http://localhost:${process.env.PORT ?? 3000}`;

function baseHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Origin: APP_ORIGIN,
  };
}

// Node's fetch can receive multiple Set-Cookie headers on one response
// (Better Auth typically sets more than one). getSetCookie() (Node 20+)
// returns them as a proper array - naive header.get("set-cookie") would
// silently merge/drop entries.
function extractCookieHeader(res: Response): string {
  const cookies = res.headers.getSetCookie?.() ?? [];
  return cookies.map((c) => c.split(";")[0].trim()).join("; ");
}

// Neon Auth only attaches the JWT on get-session's response headers
// (Set-Auth-Jwt), not on sign-up/sign-in's own response body - this
// second call is required, per Neon's documented auth flow.
async function fetchJwt(cookie: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/get-session`, {
    headers: { Cookie: cookie, Origin: APP_ORIGIN },
  });
  const jwt = res.headers.get("set-auth-jwt");
  if (!jwt) {
    throw new UnauthorizedError("Neon Auth did not return a session token");
  }
  return jwt;
}

// Decodes (does NOT verify) the JWT to read `sub`. Safe here specifically
// because this is a direct server-to-server HTTPS response from Neon Auth
// itself (the trusted issuer), not client-supplied input - unlike
// authMiddleware, which verifies every incoming token's signature because
// it could come from anyone.
function extractUserId(token: string): string {
  const { sub } = decodeJwt(token);
  if (typeof sub !== "string") {
    throw new UnauthorizedError("Neon Auth token is missing a subject claim");
  }
  return sub;
}

export class NeonAuthClient implements INeonAuthClient {
  async signUp(email: string, password: string, name: string): Promise<NeonAuthResult> {
    const res = await fetch(`${BASE_URL}/sign-up/email`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new BadRequestError(`Sign-up failed: ${body || res.statusText}`);
    }
    const cookie = extractCookieHeader(res);
    const token = await fetchJwt(cookie);
    return { userId: extractUserId(token), token };
  }

  async signIn(email: string, password: string): Promise<NeonAuthResult> {
    const res = await fetch(`${BASE_URL}/sign-in/email`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      // Wrong email/password - genuinely an auth failure, not a bad request.
      throw new UnauthorizedError("Invalid email or password");
    }
    const cookie = extractCookieHeader(res);
    const token = await fetchJwt(cookie);
    return { userId: extractUserId(token), token };
  }

  async signOut(token: string): Promise<void> {
    // Invalidates the underlying Better Auth session server-side, so no
    // NEW JWTs can be minted for it. Does NOT revoke the JWT itself -
    // that's a stateless token, already-issued copies remain valid
    // until they expire (see the earlier discussion on token lifetime).
    await fetch(`${BASE_URL}/sign-out`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Origin: APP_ORIGIN },
    });
  }
}