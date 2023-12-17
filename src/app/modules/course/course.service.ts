import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { filter } from "../../helpers/filterHelper";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (payload: any) => {
  const result = await filter(Course.find(), payload);
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
};
