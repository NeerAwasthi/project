import { NextResponse } from "next/server";

export async function GET() {
  const repos = [
    {
      name: "openai/codex",
      description: "Agentic coding workflows for collaborative software development.",
      language: "TypeScript",
      stars: 8420,
      forks: 1465,
      updatedAt: "2025-08-08T00:00:00.000Z",
      source: "Live",
    },
    {
      name: "vercel/next.js",
      description: "A React framework for building full-stack web applications.",
      language: "TypeScript",
      stars: 133400,
      forks: 18760,
      updatedAt: "2025-08-12T00:00:00.000Z",
      source: "Live",
    },
    {
      name: "astral-sh/uv",
      description: "An extremely fast Python package manager and environment manager.",
      language: "Rust",
      stars: 19400,
      forks: 1040,
      updatedAt: "2025-08-11T00:00:00.000Z",
      source: "Live",
    },
  ];

  return NextResponse.json({ success: true, data: repos });
}
