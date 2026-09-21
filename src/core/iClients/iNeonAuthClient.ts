// Abstracts calls to Neon Auth's own REST API - the external identity
// service, not our database. Same dependency-inversion principle as
// IUserRepository: AuthService/UserService depend on this interface,
// never on the concrete NeonAuthClient (fetch + cookie handling)
// directly.
export interface NeonAuthResult {
  userId: string; // the `sub` claim - matches neon_auth.user.id
  token: string; // the short-lived JWT to hand back to the client
}

export interface INeonAuthClient {
  signUp(email: string, password: string, name: string): Promise<NeonAuthResult>;
  signIn(email: string, password: string): Promise<NeonAuthResult>;
  signOut(token: string): Promise<void>;
}