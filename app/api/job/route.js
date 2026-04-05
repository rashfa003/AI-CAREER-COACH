import { NextResponse } from "next/server";
import { createJob, getJobs } from "@/actions/job";

export async function GET(request) {
  try {
    const jobs = await getJobs();
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error("/api/job GET error", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const job = await createJob(body);
    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error("/api/job POST error", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
