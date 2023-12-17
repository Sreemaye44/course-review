import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseSchemaValidation } from "./course.validation";
import { courseControllers } from "./course.controller";
const router = express.Router();
router.post(
  "/course",
  //   validateRequest(CourseSchemaValidation.createCourseSchemaValidation),
  courseControllers.createCourse
);

export const CourseRoutes = router;
