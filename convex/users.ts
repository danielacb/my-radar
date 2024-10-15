import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const create = mutation({
  args: { email: v.string(), clerkId: v.string() },
  handler: async (ctx, { email, clerkId }) => {
    const newTaskId = await ctx.db.insert("users", {
      email,
      clerkId,
      companies: [],
      isScanningJobs: false,
      jobTitles: [],
    });

    return newTaskId;
  },
});
