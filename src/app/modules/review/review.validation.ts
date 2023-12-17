import * as z from "zod";

// Define a Zod schema for the review object
const createReviewValidationSchema = z.object({
  courseId: z.string(), // Assuming courseId is a string type
  rating: z.number().min(1).max(5),
  review: z.string(),
});

export const ReviewValidationSchema = {
  createReviewValidationSchema,
};
