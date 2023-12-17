import * as z from "zod";
import { TCourse } from "./course.interface";

// Define a custom Zod schema for TCourse with the validation logic for durationInWeeks
const updateCourseSchemaValidation = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  categoryId: z.string().optional(), // Assuming categoryId is a string type
  price: z.number().min(0).optional(),
  tags: z
    .array(
      z
        .object({
          name: z.string().optional(),
          isDeleted: z.boolean().optional(),
        })
        .optional()
    )
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  details: z
    .object({
      level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
      description: z.string().optional(),
    })
    .optional(),
  durationInWeeks: z.number().optional(), // This field will be calculated and validated dynamically
});
const createCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "Title must be string",
      required_error: "Title is required",
    }),
    instructor: z.string(),
    categoryId: z.string(), // Assuming categoryId is a string type
    price: z.number().min(0),
    tags: z.array(
      z.object({
        name: z.string(),
        isDeleted: z.boolean(),
      })
    ),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: z.object({
      level: z.enum(["Beginner", "Intermediate", "Advanced"]),
      description: z.string(),
    }),
  }),

  // This field will be calculated and validated dynamically
});
export const CourseSchemaValidation = {
  createCourseSchemaValidation,
  updateCourseSchemaValidation,
};
