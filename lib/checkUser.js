"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async () => {
  try {
    console.log("checkUser running");
    const user = await currentUser();

    if (!user) return null;

    try {
      const loggedInUser = await db.user.findUnique({
        where: {
          clerkUserId: user.id,
        },
      });

      if (loggedInUser) return loggedInUser;

      const name =
        [user.firstName, user.lastName].filter(Boolean).join(" ") || null;

      const email = user.emailAddresses?.[0]?.emailAddress || null;

      const newUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name,
          imageUrl: user.imageUrl || null,
          email,
          // `skills` is required in the Prisma schema; provide a sensible default
          skills: [],
        },
      });

      return newUser;
    } catch (error) {
      console.error("checkUser error:", error);
      return null; // Return null instead of throwing to prevent layout crash
    }
  } catch (authError) {
    // If currentUser() fails (Clerk API issue), log and continue
    console.error("Clerk auth error in checkUser:", authError);
    return null;
  }
};
