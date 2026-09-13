export async function apiRequest<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let errorMessage = "Request failed.";
    try {
      const payload = (await response.json()) as { error?: { message?: string } };
      errorMessage = payload?.error?.message || errorMessage;
    } catch {
      // Ignore parse errors and use the fallback message.
    }
    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}
