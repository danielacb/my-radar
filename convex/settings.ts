import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const getJobTitles = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").collect();

    return settings.map((setting) => setting.jobTitles).flat();
  },
});

export const getIsScanningJobs = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").collect();

    return settings.map((setting) => setting.isScanningJobs)[0];
  },
});

export const setIsScanningJobs = mutation({
  args: { state: v.boolean() },
  handler: async (ctx, { state }) => {
    const settings = await ctx.db.query("settings").collect();
    const id = settings[0]._id;

    await ctx.db.patch(id, {
      isScanningJobs: state,
    });
  },
});
