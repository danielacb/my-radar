import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.id))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const company = await ctx.db
      .query("companies2")
      .filter((q) => q.eq(q.field("userId"), user?._id))
      .unique();

    if (!company) {
      throw new Error("No company found for this user");
    }

    return company;
  },
});
