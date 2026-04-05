export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") || "";

  const res = await fetch(
    `https://remotive.com/api/remote-jobs?search=${role}`,
  );

  const data = await res.json();

  return Response.json(data.jobs.slice(0, 10)); // limit to 10 jobs
}
