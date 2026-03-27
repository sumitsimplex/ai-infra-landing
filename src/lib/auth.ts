import { cookies } from "next/headers";

// Admin credentials — change these before deploying!
const ADMIN_USERNAME = "savita";
const ADMIN_PASSWORD = "AiInfra2026!";

const SESSION_COOKIE = "admin_session";
const SESSION_TOKEN = "sk_admin_session_f8a3b2c1d4e5"; // Static token for simplicity

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_TOKEN;
}

export function validateCredentials(
  username: string,
  password: string
): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export { SESSION_COOKIE, SESSION_TOKEN };
