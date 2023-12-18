import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseSchemaValidation } from "./course.validation";
import { courseControllers } from "./course.controller";
const router = express.Router();
router.post(
  "/course",
  validateRequest(CourseSchemaValidation.createCourseSchemaValidation),
  courseControllers.createCourse
);
router.get("/courses", courseControllers.getAllCourses);
router.put(
  "/courses/:_id",
  validateRequest(CourseSchemaValidation.updateCourseSchemaValidation),
  courseControllers.updateCourse
);

export const CourseRoutes = router;
