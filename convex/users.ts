import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./helpers";

export const create = mutation({
  args: { email: v.string(), clerkId: v.string() },
  handler: async (ctx, { email, clerkId }) => {
    const userId = await ctx.db.insert("users", {
      email,
      clerkId,
      jobTitles: [],
      isScanningJobs: false,
    });

    return userId;
  },
});

export const getJobTitles = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    return user.jobTitles;
  },
});

export const updateJobTitles = mutation({
  args: { jobTitles: v.array(v.string()) },
  handler: async (ctx, { jobTitles }) => {
    const user = await getAuthenticatedUser(ctx);

    return await ctx.db.patch(user._id, { jobTitles });
  },
});

export const getIsScanningJobs = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    return user.isScanningJobs;
  },
});

export const setIsScanningJobs = mutation({
  args: { state: v.boolean() },
  handler: async (ctx, { state }) => {
    const user = await getAuthenticatedUser(ctx);

    await ctx.db.patch(user._id, {
      isScanningJobs: state,
    });
  },
});
