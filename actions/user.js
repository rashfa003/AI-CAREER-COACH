"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        // find if the industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        //if industry doesn't exist, create it with default values - will replace it with ai later
        //update the user
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }
        //update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: parseInt(data.experience, 10),
            bio: data.bio,
            skills: data.skills,
          },
        });
        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, //deafault:5000
      },
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update user and industry" + error.message);
  }
}
export async function getUserOnboardingStatus() {
  try {
    const { userId } = await auth();
    if (!userId) {
      // User not logged in, return not onboarded
      return { isOnboarded: false };
    }

    let user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    // If user doesn't exist in DB, create them
    if (!user) {
      try {
        const clerkUser = await currentUser();
        
        if (!clerkUser) {
          return { isOnboarded: false };
        }

        const name =
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
        const email = clerkUser.emailAddresses?.[0]?.emailAddress || null;

        user = await db.user.create({
          data: {
            clerkUserId: userId,
            name,
            imageUrl: clerkUser.imageUrl || null,
            email,
            skills: [],
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return { isOnboarded: false };
      }
    }

    try {
      const userData = await db.user.findUnique({
        where: {
          clerkUserId: userId,
        },
        select: {
          industry: true,
        },
      });
      return {
        isOnboarded: !!userData?.industry,
      };
    } catch (error) {
      console.error("Error checking onboarding status:", error.message);
      return { isOnboarded: false };
    }
  } catch (error) {
    console.error("Error in getUserOnboardingStatus:", error);
    return { isOnboarded: false };
  }
}
