import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser, validateCompanyOwnership } from "./helpers";
import { CompanyType } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    const company = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("userId"), user?._id))
      .collect();

    return company;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    keyword: v.string(),
    careerPage: v.string(),
    website: v.string(),
  },
  handler: async (ctx, { name, keyword, careerPage, website }) => {
    const user = await getAuthenticatedUser(ctx);

    const newCompanyId = await ctx.db.insert("companies", {
      careerPage: careerPage,
      keyword,
      isKeywordFound: false,
      name,
      website,
      userId: user._id,
      isScanningJob: false,
      isJobTitleFound: false,
      isScanningKeyword: false,
    });

    const newCompany = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("_id"), newCompanyId))
      .unique();

    if (!newCompany) {
      throw new Error("Error adding a new Company");
    }

    return newCompany;
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
    await validateCompanyOwnership(ctx, company._id);

    await ctx.db.patch(company._id, { ...company });
  },
});

export const deleteCompany = mutation({
  args: { id: v.id("companies") },
  handler: async (ctx, { id }) => {
    await validateCompanyOwnership(ctx, id);

    await ctx.db.delete(id);
  },
});

export const setIsScanningCompany = mutation({
  args: { id: v.id("companies"), state: v.boolean() },
  handler: async (ctx, { id, state }) => {
    await validateCompanyOwnership(ctx, id);

    await ctx.db.patch(id, {
      isScanningKeyword: state,
      isScanningJob: state,
    });
  },
});
