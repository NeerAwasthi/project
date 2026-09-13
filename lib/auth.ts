import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
  email?: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("techpulse_session")?.value;

  if (!session) return null;

  try {
    const payload = JSON.parse(Buffer.from(session, "base64url").toString("utf-8"));
    if (!payload?.id) return null;
    return {
      id: payload.id,
      username: payload.username || "demo-user",
      name: payload.name || "Demo User",
      avatarUrl: payload.avatarUrl,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export async function setSessionUser(user: SessionUser) {
  const cookieStore = await cookies();
  const payload = Buffer.from(JSON.stringify(user)).toString("base64url");
  cookieStore.set("techpulse_session", payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionUser() {
  const cookieStore = await cookies();
  cookieStore.delete("techpulse_session");
}

export async function setOAuthState(state: string) {
  const cookieStore = await cookies();
  cookieStore.set("techpulse_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
}

export async function getOAuthState(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("techpulse_oauth_state")?.value ?? null;
}

export async function clearOAuthState() {
  const cookieStore = await cookies();
  cookieStore.delete("techpulse_oauth_state");
}
