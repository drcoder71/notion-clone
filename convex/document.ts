import { Id } from "./_generated/dataModel";
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

export const archive = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();

    if (!indentity) throw new Error("Not authentificated");

    const userId = indentity.subject;
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Not found");
    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const childrenArchived = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent_docs", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        childrenArchived(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    return document;
  },
});

export const getArchiveDocuments = query({
  args: {},
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) throw new Error("Not authentificated");

    const userId = indentity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});
