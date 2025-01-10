import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createDocs = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    isArchive: v.boolean(),
    isPublished: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) throw new Error("You're not authentificated");

    const userId = indentity.subject;

    const documents = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return documents;
  },
});
