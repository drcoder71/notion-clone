import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocs = mutation({
  args: {
    title: v.string(),
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

export const getDocuments = query({
  args: {
    parentDocument: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) throw new Error("Not authenficated! ");

    const userId = indentity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent_docs", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});
