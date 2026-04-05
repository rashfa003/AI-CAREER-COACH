"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getJobs() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: user session not found");
  }

  return await db.jobApplication.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      company: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function createJob(data) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: user session not found");
  }

  return await db.jobApplication.create({
    data: {
      userId,
      company: data.company ?? null,
      role: data.role,
      status: data.status ?? "Applied",
    },
  });
}
