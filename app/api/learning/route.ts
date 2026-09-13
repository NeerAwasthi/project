import { NextResponse } from "next/server";
import { demoLearning } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ success: true, data: demoLearning });
}
