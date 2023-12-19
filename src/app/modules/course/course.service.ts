import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { filter } from "../../helpers/filterHelper";
import mongoose from "mongoose";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (payload: any) => {
  const result = await filter(Course.find(), payload);
  return result;
};

const updateCourseintoDB = async (id: string, payload: Partial<TCourse>) => {
  const { details, tags, ...remainingCourseData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }
  const updateWithoutTags = await Course.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (tags && tags.length > 0) {
    //filter out the deleted fields
    const deletedTags = tags
      ?.filter((el: any) => el.name && el.isDeleted)
      .map((el) => el.name);

    const deletedTagNames = await Course.findOneAndUpdate(
      { id },
      {
        $pull: { tags: { name: { $in: deletedTags } } },
      }
    );
    //filter out the new course fields

    const newTags = tags?.filter((el) => el.name && !el.isDeleted);
    const newTagsName = await Course.findOneAndUpdate(
      { id },
      {
        $addToSet: { tags: { $each: newTags } },
      }
    );

    //   // modifiedUpdatedData["tags"] = tags;
  }

  const result = await Course.find({ id });

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  console.log(id);
  const result = await Course.aggregate([
    { $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) } },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },
  ]);
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCourseintoDB,
  getSingleCourseFromDB,
};
