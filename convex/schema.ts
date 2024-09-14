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

export default defineSchema({
  companies: defineTable(CompanyType),
  settings: defineTable({
    isScanningJobs: v.boolean(),
    jobTitles: v.array(v.string()),
    theme: v.string(),
  }),
});
