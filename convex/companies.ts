import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { CompanyType } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("companies").collect();
  },
});

export const getById = query({
  args: { id: v.id("companies") },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("_id"), id))
      .collect();
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

export const create = mutation({
  args: {
    name: v.string(),
    careerPage: v.string(),
    keyword: v.string(),
    website: v.string(),
  },
  handler: async (ctx, args) => {
    const { name, careerPage, keyword, website } = args;

    const id = await ctx.db.insert("companies", {
      name,
      careerPage,
      keyword,
      website,
      isJobFound: false,
      isScanningJob: false,
      isKeywordFound: false,
      isScanningKeyword: false,
    });

    const company = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("_id"), id))
      .collect();

    return company[0];
  },
});

export const deleteCompany = mutation({
  args: { id: v.id("companies") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
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
