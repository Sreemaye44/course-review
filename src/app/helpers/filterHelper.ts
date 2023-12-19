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
  const {
    minPrice,
    maxPrice,
    sortBy,
    tags,
    level,
    startDate,
    endDate,
    sortOrder,
    page: rawPage = "1",
    limit: rawLimit = "10",

    ...restQuery
  } = queryObj;
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
  if (startDate !== undefined || endDate !== undefined) {
    const dateFilter: Record<string, any> = {};
    if (startDate !== undefined) {
      dateFilter.$gte = startDate;
    }
    if (endDate !== undefined) {
      dateFilter.$lte = endDate;
    }
    modelQuery = modelQuery.find({
      $and: [{ startDate: dateFilter }, { endDate: dateFilter }],
    });
  }

  if (sortBy !== undefined && sortOrder !== undefined) {
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
  const page = parseInt(rawPage, 10);
  const limit = parseInt(rawLimit, 10);
  const startIndex = (page - 1) * limit; // Calculate the starting index for pagination
  modelQuery = modelQuery.skip(startIndex).limit(limit); // Apply pagination

  return modelQuery;
};
