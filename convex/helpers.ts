import { Auth } from "convex/server";

import { QueryCtx } from "./_generated/server";

export const getUserIdentity = async (auth: Auth) => {
  const identity = await auth.getUserIdentity();

  if (!identity) {
    throw new Error("Not authenticated");
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
