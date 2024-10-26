import { Auth } from "convex/server";

import { QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getUserIdentity = async (auth: Auth) => {
  const identity = await auth.getUserIdentity();

  if (!identity) {
    throw new Error("User authentication required");
  }

  return identity;
};

export const getAuthenticatedUser = async (ctx: QueryCtx) => {
  const identity = await getUserIdentity(ctx.auth);

  const user = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("clerkId"), identity.id))
    .unique();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const validateCompanyOwnership = async (
  ctx: QueryCtx,
  companyId: Id<"companies">,
): Promise<void> => {
  const user = await getAuthenticatedUser(ctx);
  const company = await ctx.db.get(companyId);

  if (!company || company.userId !== user._id) {
    throw new Error("Company not found or access denied");
  }
};
