import { NextResponse } from "next/server";
import { demoNews } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ success: true, data: demoNews });
}
