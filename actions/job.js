"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function createJob(data) {
  const { userId } = auth();

  return await db.jobApplication.create({
    data: {
      userId,
      company: data.company,
      role: data.role,
      status: data.status,
    },
  });
}
