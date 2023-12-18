import { Query } from "mongoose";
import { TQueryObject } from "../interface/queryObject";

export const filter = <T>(
  modelQuery: Query<T[], T>,
  queryObj: TQueryObject
) => {
  const excludedFields = [
    "page",
    "searchTerm",
    "limit",
    "sort",
    "sortBy",
    "sortOrder",
    "fields",
  ];
  const { minPrice, maxPrice, sortBy, tags, level, ...restQuery } = queryObj;
  excludedFields.forEach((keyword) => delete queryObj[keyword]);

  modelQuery = modelQuery.find(restQuery);
  if (minPrice !== undefined) {
    modelQuery = modelQuery.find({ price: { $gte: minPrice } });
  }
  if (maxPrice !== undefined) {
    modelQuery = modelQuery.find({ price: { $lte: maxPrice } });
  }
  if (tags !== undefined) {
    modelQuery = modelQuery.find({
      "tags.name": tags,
      "tags.isDeleted": false,
    });
  }
  if (level !== undefined) {
    modelQuery = modelQuery.find({ "details.level": level });
  }

  if (sortBy !== undefined) {
    const allowedSortFields = [
      "title",
      "price",
      "startDate",
      "endDate",
      "language",
      "durationInWeeks",
    ];

    if (allowedSortFields.includes(sortBy)) {
      const sortOrder = queryObj.sortOrder === "desc" ? -1 : 1;
      modelQuery = modelQuery.sort({ [sortBy]: sortOrder });
    }
  }

  return modelQuery;
};
