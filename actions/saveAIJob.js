"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function saveAIJob({ role, industry, query, link }) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const job = await db.jobApplication.create({
    data: {
      userId,
      role,
      status: "Applied",
      source: "LinkedIn AI",
      link,
      company: query || null,
    },
  });

  await db.activity.create({
    data: {
      message: `Applied to ${role} via LinkedIn AI`,
    },
  });

  return job;
}
