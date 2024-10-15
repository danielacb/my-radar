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

const UserType = {
  clerkId: v.string(),
  companies: v.array(
    v.object({
      careerPage: v.object({
        keyword: v.string(),
        url: v.string(),
      }),
      isJobFound: v.boolean(),
      isJobTitleFound: v.boolean(),
      name: v.string(),
      website: v.string(),
    }),
  ),
  email: v.string(),
  isScanningJobs: v.boolean(),
  jobTitles: v.array(v.string()),
};

export default defineSchema({
  users: defineTable(UserType),
  companies: defineTable(CompanyType),
  settings: defineTable({
    isScanningJobs: v.boolean(),
    jobTitles: v.array(v.string()),
    theme: v.string(),
  }),
});
