import { env } from "@/lib/env";

export function getAiServiceStatus() {
  if (env.demoMode) {
    return { available: true, mode: "demo", reason: "Demo mode is enabled." };
  }

  if (!env.geminiApiKey) {
    return {
      available: false,
      mode: "missing-config",
      reason: "GEMINI_API_KEY is not configured.",
    };
  }

  return { available: true, mode: "configured" };
}
