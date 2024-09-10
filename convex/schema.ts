import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  companies: defineTable({
    careerPage: v.string(),
    isJobFound: v.boolean(),
    isKeywordFound: v.boolean(),
    keyword: v.string(),
    name: v.string(),
    website: v.string(),
  }),
});
