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
  userId: v.id("users"),
  name: v.string(),
  website: v.string(),
  isJobTitleFound: v.boolean(),
  lastScanDate: v.optional(v.number()),
  careerPage: v.object({
    url: v.string(),
    keyword: v.string(),
    isKeywordFound: v.boolean(),
  }),
};

const UserType = {
  clerkId: v.string(),
  email: v.string(),
  jobTitles: v.array(v.string()),
  isScanningJobs: v.boolean(),
};

export default defineSchema({
  users: defineTable(UserType),
  companies: defineTable(CompanyType),
  companies2: defineTable(CompanyType2),
});
