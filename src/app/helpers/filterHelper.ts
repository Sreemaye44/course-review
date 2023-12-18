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
  const { minPrice, maxPrice, ...restQuery } = queryObj;
  excludedFields.forEach((keyword) => delete queryObj[keyword]);

  modelQuery = modelQuery.find(restQuery);
  if (minPrice !== undefined) {
    modelQuery = modelQuery.find({ price: { $gte: minPrice } });
  }
  if (maxPrice !== undefined) {
    modelQuery = modelQuery.find({ price: { $lte: maxPrice } });
  }

  return modelQuery;
};
