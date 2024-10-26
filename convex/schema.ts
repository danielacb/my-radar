import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const CompanyType = {
  userId: v.id("users"),
  name: v.string(),
  website: v.string(),
  isJobTitleFound: v.boolean(),
  lastScanDate: v.optional(v.number()),
  isScanningJob: v.boolean(),
  careerPage: v.string(),
  keyword: v.string(),
  isKeywordFound: v.boolean(),
  isScanningKeyword: v.boolean(),
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
});
