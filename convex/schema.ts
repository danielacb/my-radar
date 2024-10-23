import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const CompanyType = {
  careerPage: v.string(),
  isJobFound: v.boolean(),
  isScanningJob: v.boolean(),
  isKeywordFound: v.boolean(),
  isScanningKeyword: v.boolean(),
  keyword: v.string(),
  name: v.string(),
  website: v.string(),
};

export const CompanyType2 = {
  list: v.array(
    v.object({
      careerPage: v.object({
        url: v.string(),
        keyword: v.string(),
        isKeywordFound: v.boolean(),
      }),
      isJobTitleFound: v.boolean(),
      name: v.string(),
      website: v.string(),
      lastScanDate: v.optional(v.number()),
    }),
  ),
  userId: v.optional(v.id("users")),
  isScanningJobs: v.boolean(),
  lastScanDate: v.optional(v.number()),
};

const UserType = {
  clerkId: v.string(),
  email: v.string(),
  jobTitles: v.array(v.string()),
  companiesId: v.id("companies2"),
};

export default defineSchema({
  users: defineTable(UserType),
  companies: defineTable(CompanyType),
  companies2: defineTable(CompanyType2),
  settings: defineTable({
    isScanningJobs: v.boolean(),
    jobTitles: v.array(v.string()),
    theme: v.string(),
  }),
});
