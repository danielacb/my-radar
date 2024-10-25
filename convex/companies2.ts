import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./helpers";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    const company = await ctx.db
      .query("companies2")
      .filter((q) => q.eq(q.field("userId"), user?._id))
      .collect();

    if (!company) {
      throw new Error("No company found for this user");
    }

    return company;
  },
});
