import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const create = mutation({
  args: { email: v.string(), clerkId: v.string() },
  handler: async (ctx, { email, clerkId }) => {
    const companiesId = await ctx.db.insert("companies2", {
      list: [],
      isScanningJobs: false,
    });

    const userId = await ctx.db.insert("users", {
      email,
      clerkId,
      companiesId,
      jobTitles: [],
    });

    await ctx.db.patch(companiesId, { userId });

    return userId;
  },
});
