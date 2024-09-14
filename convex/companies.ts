import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { CompanyType } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("companies").collect();
  },
});

export const update = mutation({
  args: {
    company: v.object({
      ...CompanyType,
      _id: v.id("companies"),
      _creationTime: v.number(),
    }),
  },
  handler: async (ctx, { company }) => {
    await ctx.db.patch(company._id, { ...company });
  },
});

export const setIsScanningCompany = mutation({
  args: { id: v.id("companies"), state: v.boolean() },
  handler: async (ctx, { id, state }) => {
    await ctx.db.patch(id, {
      isScanningKeyword: state,
      isScanningJob: state,
    });
  },
});
