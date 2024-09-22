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

export const updateJobTitles = mutation({
  args: { jobTitles: v.array(v.string()) },
  handler: async (ctx, { jobTitles }) => {
    const settingsData = await ctx.db.query("settings").collect();
    const id = settingsData[0]?._id;

    if (id) {
      return await ctx.db.patch(id, { jobTitles });
    } else {
      return {
        isScanningJobs: false,
        jobTitles: [],
      };
    }
  },
});
