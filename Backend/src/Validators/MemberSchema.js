
const { z } = require("zod");

const profileCreateSchema = z.object({
  body: z.object({

    PhoneNo: z
      .string()
      .trim()
      .regex(
        /^\+?[1-9]\d{7,14}$/,
        "Enter a valid phone number"
      ),

    DateOfBirth: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Date of birth must use YYYY-MM-DD format"
      )
      .refine((value) => {
        const date = new Date(`${value}T00:00:00.000Z`);

        return (
          !Number.isNaN(date.getTime()) &&
          date.toISOString().slice(0, 10) === value &&
          date <= new Date()
        );
      }, "Enter a valid date that is not in the future"),

    Gender: z
      .enum([
        "Male",
        "Female",
        "Non-binary",
        "Prefer not to say"
      ])
      .optional(),

    address: z.object({
      Country: z.string().trim().min(1, "Country is required"),

      City: z.string().trim().min(1, "City is required"),

      State: z.string().trim().min(1, "State is required"),

      PostalCode: z.string().trim().min(1, "Postal code is required"),

      Street: z.string().trim().max(200).optional(),

      Landmark: z.string().trim().max(200).optional()
    }).strict()
  }).strict()
});

module.exports = { profileCreateSchema };