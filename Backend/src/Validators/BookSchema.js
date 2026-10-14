
const { z } = require("zod");

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

const createBookSchema = z.object({
  body: z.object({
    Title: z.string()
      .trim()
      .min(1, "Title is required")
      .max(500),

    isbn10: z.string()
      .trim()
      .regex(/^(?:\d{9}[\dXx])$/, "Invalid ISBN-10 format")
      .optional(),

    isbn13: z.string()
      .trim()
      .regex(/^\d{13}$/, "Invalid ISBN-13 format")
      .optional(),

    description: z.string()
      .trim()
      .max(5000)
      .optional(),

    publishedYear: z.number()
      .int()
      .min(1000)
      .max(new Date().getFullYear()),

    language: z.string()
      .trim()
      .min(2)
      .max(50)
      .default("English"),

    edition: z.string()
      .trim()
      .max(100)
      .optional(),

    totalCopies: z.number()
      .int()
      .min(0),

    availableCopies: z.number()
      .int()
      .min(0),

    pageCount: z.number()
      .int()
      .positive()
      .optional(),

    format: z.enum([
      "Paperback",
      "Hardcover",
      "Ebook",
      "Audiobook"
    ]),

    status: z.enum(["active", "withdrawn"])
      .default("active"),

    authorID: objectIdSchema,
    publisherID: objectIdSchema,
    categoryID: objectIdSchema
  })
  .superRefine((data, ctx) => {
    if (!data.isbn10 && !data.isbn13) {
      ctx.addIssue({
        code: "custom",
        path: ["isbn13"],
        message: "Provide at least one ISBN"
      });
    }

    if (data.availableCopies > data.totalCopies) {
      ctx.addIssue({
        code: "custom",
        path: ["availableCopies"],
        message: "Available copies cannot exceed total copies"
      });
    }
  }),

  params: z.object({}),
  query: z.object({})
});

module.exports = { createBookSchema };

